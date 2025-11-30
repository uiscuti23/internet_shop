import cl from '../../../styles/adminpg/devices/device_create.module.css';
import { useEffect, useState } from 'react';
import { CtaButton } from '../../UI/buttons/CtaButton';
import { Success } from '../../animation/Success';
import { useAuth } from '../../../hook/useAuth';
import { createDevice } from '../../../http/DeviceApi';
import { CreateFormInputItem } from '../create_components/CreateFormInputItem';
import { CreateFormFileItem } from '../create_components/CreateFormFileItem';
import { observer } from 'mobx-react-lite';
import { SearchByDataInput } from '../../UI/SearchByDataInput';

const DeviceCreate = observer(
  ({
    isActive,
    setIsActive,
    setTypeModalIsActive,
    setBrandModalIsActive,
    selectedBrandParams,
    selectedTypeParams,
  }) => {
    const { selectedTypeValue, setSelectedTypeValue, selectedTypeId, setSelectedTypeId } =
      selectedTypeParams;

    const { selectedBrandValue, setSelectedBrandValue, selectedBrandId, setSelectedBrandId } =
      selectedBrandParams;

    const { stores, getDevices, sleep, getTypes, getBrands } = useAuth();

    const types = stores.type.types;
    const brands = stores.brand.brands;

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [imgSrc, setImgSrc] = useState(null);

    const [inputValue, setInputValue] = useState('');
    const [priceInputValue, setPriceInputValue] = useState('');
    const [typeInputValue, setTypeInputValue] = useState('');
    const [brandInputValue, setBrandInputValue] = useState('');

    const [isResetBtnShow, setIsResetBtnShow] = useState(false);
    const [isResetBtnPriceShow, setIsResetBtnPriceShow] = useState(false);
    const [isResetBtnTypeShow, setIsResetBtnTypeShow] = useState(false);
    const [isResetBtnBrandShow, setIsResetBtnBrandShow] = useState(false);

    const [isCheckValue, setIsCheckValue] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [isSuccessActive, setIsSuccessActive] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      setIsCheckValue(false);
    }, [isActive]);

    useEffect(() => {
      getTypes();
      getBrands();
    }, []);

    const resetData = () => {
      setInputValue('');
      setPriceInputValue('');
      setTypeInputValue('');
      setBrandInputValue('');
      setSelectedTypeValue('');
      setSelectedTypeId(null);
      setSelectedBrandValue('');
      setSelectedBrandId(null);
      resetFileData();
    };
    const resetFileData = e => {
      if (e) e.preventDefault();
      setFileName('');
      setImgSrc(null);
      setFile(null);
    };

    const resetBtns = () => {
      setIsResetBtnShow(false);
      setIsResetBtnPriceShow(false);
      setIsResetBtnTypeShow(false);
      setIsResetBtnBrandShow(false);
    };

    const setAnimationState = bool => {
      setIsSuccessActive(bool);
      setIsInputDisabled(bool);
    };

    const selectFile = e => {
      e.preventDefault();
      const selectedFile = e.target.files[0] ?? null;
      if (selectedFile) {
        setFileName(selectedFile.name || 'unnamed');
        setImgSrc(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
      } else {
        resetData();
      }
      e.target.value = null;
    };

    const clickHandler = e => {
      e.preventDefault();
      addNewObj(addParams, paramsKeys, createDevice, getDevices);
    };

    const addParams = [inputValue, priceInputValue, selectedTypeId, selectedBrandId, file];
    const paramsKeys = ['name', 'price', 'typeId', 'brandId', 'img'];

    const addNewObj = async (paramsArr, paramsKeys, createObj, getObj) => {
      try {
        setIsCheckValue(true);
        paramsArr.forEach(i => console.log(i));
        if (
          paramsArr.map(item => !!item).includes(false) ||
          paramsArr.length !== paramsKeys.length
        ) {
          return;
        }
        setIsError(false);
        const formData = new FormData();
        paramsKeys.forEach((i, ind) => formData.append(i, paramsArr[ind]));

        const res = await createObj(formData);
        if (res) {
          setAnimationState(true);
          getObj();
          await sleep(1800);
          setIsActive(false);
          setAnimationState(false);
          resetData();
          resetBtns();
          setIsCheckValue(false);
        } else {
          setIsError(true);
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    };

    const setInputValueAndShowResetBtn = (
      e,
      setName,
      setIsReset,
      isShow,
      checkIsNumber = false
    ) => {
      let inputText = e.target.value;
      if (checkIsNumber && isNaN(inputText.at(-1))) {
        inputText = inputText.slice(0, -1);
      }

      setName(inputText);
      if (!inputText.length) setIsReset(false);
      if (inputText.length && !isShow) setIsReset(true);
    };

    const clearInputAndSetFocus = (e, setName, setIsReset) => {
      e.preventDefault();
      setName('');
      e.target.closest('button').previousElementSibling.focus();
      setIsReset(false);
    };

    const errorValue = (errMsg, checkVal, isCheck, isCheck2 = false) => {
      return (isCheck || isCheck2) && !checkVal?.length ? errMsg : '';
    };

    const inputItemParams = {
      mutableInputValue: inputValue,
      setMutableInputValue: setInputValue,
      mutableObjIsReset: isResetBtnShow,
      setMutableObjIsReset: setIsResetBtnShow,
      isInputDisabled,
      isCheckValue,
      checkIsNumber: false,
    };

    const inputItemParamsForPrice = {
      mutableInputValue: priceInputValue,
      setMutableInputValue: setPriceInputValue,
      mutableObjIsReset: isResetBtnPriceShow,
      setMutableObjIsReset: setIsResetBtnPriceShow,
      isInputDisabled,
      isCheckValue,
      checkIsNumber: true,
    };

    const inputItemParamsForType = {
      mutableInputValue: typeInputValue,
      setMutableInputValue: setTypeInputValue,
      mutableObjIsReset: isResetBtnTypeShow,
      setMutableObjIsReset: setIsResetBtnTypeShow,
      isInputDisabled,
      isCheckValue,
      checkIsNumber: false,
    };

    const inputItemParamsForBrand = {
      mutableInputValue: brandInputValue,
      setMutableInputValue: setBrandInputValue,
      mutableObjIsReset: isResetBtnBrandShow,
      setMutableObjIsReset: setIsResetBtnBrandShow,
      isInputDisabled,
      isCheckValue,
      checkIsNumber: false,
    };

    const inputItemFn = { setInputValueAndShowResetBtn, clearInputAndSetFocus, errorValue };

    return (
      <div className={cl.create_device}>
        <form className={cl.type__form}>
          <CreateFormInputItem
            heading={'Name'}
            inputName={'new_device'}
            errorText={'fill in the field'}
            inputItemParams={inputItemParams}
            inputItemFn={inputItemFn}
          />
          <CreateFormInputItem
            heading={'Price'}
            inputName={'device_price'}
            errorText={'fill in the field'}
            inputItemParams={inputItemParamsForPrice}
            inputItemFn={inputItemFn}
          />
          <CreateFormInputItem
            heading={'Discounted'}
            inputName={'device_discounted'}
            errorText={'fill in the field'}
            inputItemParams={inputItemParamsForPrice}
            inputItemFn={inputItemFn}
          />
          <CreateFormInputItem
            heading={'Count'}
            inputName={'device_count'}
            errorText={'fill in the field'}
            inputItemParams={inputItemParamsForPrice}
            inputItemFn={inputItemFn}
          />
          <CreateFormInputItem
            heading={'Defenition'}
            inputName={'device_defenition'}
            errorText={'fill in the field'}
            inputItemParams={inputItemParams}
            inputItemFn={inputItemFn}
          />
          <SearchByDataInput
            data={types}
            heading={'Type'}
            inputName={'device_type'}
            errorText={'type not found'}
            inputItemParams={inputItemParamsForType}
            inputItemFn={inputItemFn}
            isActive={isActive}
            setIsActive={setIsActive}
            setSecondIsActive={setTypeModalIsActive}
            selectedValue={selectedTypeValue}
            setSelectedValue={setSelectedTypeValue}
            setSelectedItemId={setSelectedTypeId}
          />
          <SearchByDataInput
            data={brands}
            heading={'Brand'}
            inputName={'device_brand'}
            errorText={'brand not found'}
            inputItemParams={inputItemParamsForBrand}
            inputItemFn={inputItemFn}
            isActive={isActive}
            setIsActive={setIsActive}
            setSecondIsActive={setBrandModalIsActive}
            selectedValue={selectedBrandValue}
            setSelectedValue={setSelectedBrandValue}
            setSelectedItemId={setSelectedBrandId}
          />
          <CreateFormFileItem
            heading={'Attach a photo'}
            inputName={'type_file'}
            errorText={'select a file'}
            fileData={{ file, fileName, imgSrc }}
            fileItemFn={{ selectFile, resetFileData, errorValue }}
            isCheckValue={isCheckValue}
          />
          <div className={cl.button__row}>
            <CtaButton onClick={clickHandler} disabled={isInputDisabled}>
              Add device
            </CtaButton>
            <Success
              message={'type updated!'}
              errorText={"couldn't add a device"}
              isSuccessActive={isSuccessActive}
              isError={isError}
            />
          </div>
        </form>
      </div>
    );
  }
);

export { DeviceCreate };
