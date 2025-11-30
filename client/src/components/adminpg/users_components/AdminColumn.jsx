import cl from '../../../styles/adminpg/users/users_admin.module.css';
import { AdminDate } from './AdminDate';
import { AdminEmail } from './AdminEmail';
import { AdminChangeButton } from './AdminChangeButton';
import { AdminDeleteButton } from './AdminDeleteButton';

const AdminColumn = ({ user, selectedId, select }) => {
  const { email, role, updatedAt, createdAt, id } = user;
  const isUpdated = updatedAt !== createdAt;
  const isSelected = id === selectedId;

  return (
    <li className={cl.column} onClick={() => select(id)}>
      <AdminEmail email={email} role={role} />
      <AdminDate timeString={createdAt} verify={false} isUpdated={isUpdated} />
      <AdminDate timeString={updatedAt} verify={true} isUpdated={isUpdated} />
      <AdminChangeButton isSelected={isSelected} id={id} email={email} role={role.toLowerCase()} />
      <AdminDeleteButton isSelected={isSelected} email={email} />
    </li>
  );
};

export { AdminColumn };
