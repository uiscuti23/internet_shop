import cl from '../../../styles/adminpg/users/users_admin.module.css';
import { AdminDateItem } from './AdminDateItem';

const AdminDate = ({ timeString, verify, isUpdated }) => {
  if (verify && !isUpdated) {
    return <div className={cl.item + ' ' + cl.date}></div>;
  }

  return (
    <div className={cl.item + ' ' + cl.date}>
      <AdminDateItem timeString={timeString} isDay={true} />
      <AdminDateItem timeString={timeString} isDay={false} />
    </div>
  );
};

export { AdminDate };
