import cl from '../../../styles/adminpg/users/users_admin.module.css';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../../hook/useAuth';

const AdminDeleteButton = observer(({ isSelected, email }) => {
  const { deleteCurrentUser } = useAuth();

  const clickHandler = e => {
    e.preventDefault();
    deleteCurrentUser(email);
  };

  return (
    <div className={isSelected ? cl.item : cl.item + ' ' + cl.hidden_item}>
      <button className={cl.button + ' ' + cl.delete} onClick={clickHandler}>
        Delete
      </button>
    </div>
  );
});

export { AdminDeleteButton };
