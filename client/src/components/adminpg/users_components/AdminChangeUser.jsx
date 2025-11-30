import cl from '../../../styles/adminpg/users/admin_change_user.module.css';
import { useState, useEffect } from 'react';
import { AdminChangeFormItem } from './AdminChangeFormItem';

import { changeUser } from '../../../http/UserApi';
import { Success } from '../../animation/Success';
import { CtaButton } from '../../UI/buttons/CtaButton';
import { ChangeInput } from '../../UI/inputs/ChangeInput';
import { useAuth } from '../../../hook/useAuth';
import { observer } from 'mobx-react-lite';

const AdminChangeUser = observer(({ id, email, role, isActive, setIsActive }) => {
  const { getAndSetUsers, sleep } = useAuth();

  const [value, setValue] = useState(role);
  const [newEmail, setNewEmail] = useState('');

  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isSuccessActive, setIsSuccessActive] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isActive) {
      sleep(400).then(() => resetValues());
    }
  }, [isActive]);

  const resetValues = () => {
    setNewEmail('');
    setValue(role);
  };

  const clickHandler = e => {
    e.preventDefault();
    updateUser();
  };

  const changeValue = checkedVal => {
    setValue(checkedVal);
  };

  const updateUser = async () => {
    try {
      const res = await changeUser(email, newEmail, value.toUpperCase());
      if (res[0] === 1) {
        // console.log('Параметры пользователя успешно обновлены')
        setIsError(false);
        setIsSuccessActive(true);
        setIsInputDisabled(true);
        getAndSetUsers();
      } else {
        console.log('Обновление параметров пользователя прошла безуспешно');
      }
    } catch (err) {
      console.log(err.response.data.message);
      setIsError(true);
    } finally {
      await sleep(1800);
      setIsActive(false);
      setIsSuccessActive(false);
      setIsInputDisabled(false);
    }
  };

  return (
    <div className={cl.change_user}>
      <div className={cl.row}>
        <div className={cl.info}>
          <div className={cl.email}>
            <div className={cl.heading}>Email:</div>
            <div className={cl.text}>{email}</div>
          </div>
          <div className={cl.current_role}>
            <div className={cl.heading}>Role:</div>
            <div className={cl.text}>{role}</div>
          </div>
        </div>
        <form className={cl.change_form}>
          <div className={cl.form__item}>
            <label className={cl.input__label}>
              <div className={cl.input__heading}>New email</div>
              <ChangeInput
                name='new_email'
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                disabled={isInputDisabled}
              />
            </label>
          </div>
          <div className={cl.radiobuttons}>
            <div className={cl.input__heading}>New role</div>
            <div className={cl.radio__row}>
              <AdminChangeFormItem
                value={value}
                currentValue='user'
                userId={id}
                idClass='_radio_change_'
                callback={changeValue}
                disabled={isInputDisabled}
              />
              <AdminChangeFormItem
                value={value}
                currentValue='seller'
                userId={id}
                idClass='_radio_change_'
                callback={changeValue}
                disabled={isInputDisabled}
              />
              <AdminChangeFormItem
                value={value}
                currentValue='admin'
                userId={id}
                idClass='_radio_change_'
                callback={changeValue}
                disabled={isInputDisabled}
              />
            </div>
          </div>
          <div className={cl.button__row}>
            <CtaButton onClick={clickHandler} disabled={isInputDisabled}>
              Change user
            </CtaButton>
            <Success
              message={'user changed'}
              errorText={"couldn't change user"}
              isSuccessActive={isSuccessActive}
              isError={isError}
            />
          </div>
        </form>
      </div>
    </div>
  );
});

export { AdminChangeUser };
