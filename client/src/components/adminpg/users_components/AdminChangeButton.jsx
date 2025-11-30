import cl from '../../../styles/adminpg/users/users_admin.module.css';
import { AdminChangeUser } from './AdminChangeUser';
import { useState } from 'react';
import { NewModal } from '../../NewModal';
import { useAuth } from '../../../hook/useAuth.js';
import { observer } from 'mobx-react-lite';

const AdminChangeButton = observer(({ isSelected, id, email, role }) => {
  const { openPopup, closePopup } = useAuth();
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={isSelected ? cl.item : cl.item + ' ' + cl.hidden_item}>
      <button className={cl.button + ' ' + cl.change} onClick={() => openPopup(setModalActive)}>
        Change
      </button>
      <NewModal
        isActive={modalActive}
        setIsActive={setModalActive}
        closePopup={closePopup}
        title={'Change user params'}>
        <AdminChangeUser
          id={id}
          email={email}
          role={role}
          isActive={modalActive}
          setIsActive={setModalActive}
        />
      </NewModal>
    </div>
  );
});

export { AdminChangeButton };
