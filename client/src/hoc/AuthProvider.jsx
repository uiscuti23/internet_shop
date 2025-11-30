import { createContext } from 'react';
import UserStore from '../store/UserStore';
import DeviceStore from '../store/DeviceStore';
import TypeStore from '../store/TypeStore';
import BrandStore from '../store/BrandStore';
import AllUsersStore from '../store/AllUsersStore';
import { check, deleteUser, fetchUsers } from '../http/UserApi';
import { changeType, deleteType, fetchTypes } from '../http/TypeApi';
import { deleteBrand, fetchBrands } from '../http/BrandApi';
import { fetchDevices } from '../http/DeviceApi';
import GlobalStore from '../store/GlobalStore';
import ModalStore from '../store/ModalStore';
import CreateStore from '../store/CreateStore';
import InterimStore from '../store/InterimStore';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const stores = {
    user: new UserStore(),
    device: new DeviceStore(),
    type: new TypeStore(),
    brand: new BrandStore(),
    allUsers: new AllUsersStore(),
    global: new GlobalStore(),
    modal: new ModalStore(),
    create: new CreateStore(),
    interim: new InterimStore(),
  };

  // USER functions
  const logIn = newUserObject => {
    stores.user.setUser(newUserObject);
    stores.user.setIsAuth(true);
  };

  const logOut = () => {
    stores.user.setUser({});
    stores.user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  const checkAuth = async () => {
    try {
      const res = await check();
      logIn(res);
    } catch (err) {
      console.log(err.response.data.message);
      logOut();
    } finally {
      stores.user.setIsLoading(false);
    }
  };

  const getAndSetUsers = async () => {
    try {
      // stores.allUsers.setIsLoading(true);
      const res = await fetchUsers();
      stores.allUsers.setAllUsers(res);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      stores.allUsers.setIsLoading(false);
    }
  };

  const deleteCurrentUser = async email => {
    try {
      const res = await deleteUser(email);
      if (res === 1) {
        // console.log('Пользователь успешно удален');
        getAndSetUsers();
      } else {
        console.log('Не получилось удалить пользователя');
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // TYPES functions

  const getTypes = async () => {
    try {
      const res = await fetchTypes();
      stores.type.setTypes(res);
      return res;
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      stores.type.setIsLoading(false);
    }
  };

  const deleteCurrentType = async id => {
    try {
      const res = await deleteType(id);
      if (res === 1) {
        // console.log('Тип успешно удален');
        getAndValidateTypes();
      } else {
        console.log('Не получилось удалить тип');
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const checkAndGetTypes = async (condition, changedTypesArr) => {
    let res;
    if (condition) {
      res = await checkDraggedTypes(changedTypesArr);
      removeLocalhost('draggedTypes');
    } else {
      res = await getAndValidateTypes();
    }
    const firstFetchingTypes = res.map(type => [type.id, type.order]);
    setLocalhost('sourceTypes', firstFetchingTypes);
  };

  const getAndValidateTypes = async () => {
    try {
      // stores.type.setIsLoading(true);
      const res = await fetchTypes();
      const validatedRes = validateOrder(res);
      const resultData = Boolean(validatedRes.length) ? validatedRes : res;
      stores.type.setTypes(resultData);
      return resultData;
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      stores.type.setIsLoading(false);
    }
  };

  const checkDraggedTypes = async draggedTypes => {
    const isRefreshed = await refreshTypes(draggedTypes);
    if (isRefreshed) {
      const res = await getAndValidateTypes();
      return res;
    }
  };

  const refreshTypes = async array => {
    try {
      for (const arr of array) {
        const res = await changeType(...arr);
        if (res[0] === 1) {
          console.log('Тип успешно изменен');
        } else {
          console.log('Не получилось изменить тип');
        }
      }
      return true;
    } catch (err) {
      // console.log(err.response.data.message);
      return false;
    }
  };

  // BRANDS functions

  const getBrands = async () => {
    try {
      const res = await fetchBrands();
      stores.brand.setBrands(res);
      return res;
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      stores.brand.setIsLoading(false);
    }
  };

  const deleteCurrentBrand = async id => {
    try {
      const res = await deleteBrand(id);
      if (res === 1) {
        // console.log('Бренд успешно удален');
        getBrands();
      } else {
        console.log('Не получилось удалить бренд');
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  // Devices functions

  const getDevices = async () => {
    try {
      const res = await fetchDevices();
      stores.device.setDevices(res.rows);
      return res;
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      stores.device.setIsLoading(false);
    }
  };

  // Types helpers

  function setOrders(arr) {
    return [...arr]
      .sort((a, b) => a.order - b.order)
      .map((item, index) => (item.order === index ? item : { ...item, order: index }));
  }

  function validateOrder(res) {
    const orderArr = res.map(item => item.order);
    const uniqueOrders = new Set(orderArr);
    let changedTypes = [];

    if (orderArr.length !== uniqueOrders.size) {
      changedTypes = setOrders(res);
      let notCoincidence = [];

      changedTypes.forEach((item, index) => {
        if (item.id !== res[index].id || item.order !== res[index].order) {
          notCoincidence.push([item.id, item.order]);
        }
      });
      notCoincidence.forEach(item => changeType(...item));
    }
    return changedTypes;
  }

  // POPUP functions

  const openPopup = async (setIsActiveFn, isParActVal = null, setIsParActVal = null) => {
    if (stores.modal.isDelay) return;
    isParActVal && setIsParActVal ? await closePopup(setIsParActVal, false) : bodyLock();
    setIsActiveFn(true);
  };

  const closePopup = async (setIsActiveFn, doUnlock = true, setIsParActVal = null) => {
    if (stores.modal.isDelay) return;
    setIsActiveFn(false);
    if (!doUnlock) {
      if (setIsParActVal) {
        await waitDelay(500); // ожидание закрытия 2 попапа
        setIsParActVal(true);
      }
      await sleep(200); // ожидание открытия 2 попапа
      return;
    }
    await sleep(500);
    bodyUnLock();
  };

  function bodyLock(value = 500) {
    stores.global.setAppIsLocked(true);
    document.body.classList.add('_lock');
    waitDelay(value);
  }

  function bodyUnLock(value = 500) {
    stores.global.setAppIsLocked(false);
    document.body.classList.remove('_lock');
    waitDelay(value);
  }

  async function waitDelay(value = 600) {
    stores.modal.setIsDelay(true);
    await sleep(value);
    stores.modal.setIsDelay(false);
  }

  // LOCALHOST functions

  const setLocalhost = (str, obj) => localStorage.setItem(`${str}`, JSON.stringify(obj));
  const getLocalhost = str => JSON.parse(localStorage.getItem(`${str}`));
  const removeLocalhost = str => localStorage.removeItem(`${str}`);

  // settimeout function

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const value = {
    stores,
    logIn,
    logOut,
    checkAuth,
    checkAndGetTypes,
    getAndSetUsers,
    deleteCurrentUser,
    getAndValidateTypes,
    refreshTypes,
    checkDraggedTypes,
    getTypes,
    deleteCurrentType,
    setLocalhost,
    getLocalhost,
    removeLocalhost,
    getBrands,
    deleteCurrentBrand,
    getDevices,
    openPopup,
    closePopup,
    sleep,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
