import { useRef } from 'react';
import cl from '../styles/adminpg/users/admin_page.module.css';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const AdminPage = () => {
  const { closePopup } = useAuth();
  const adminRef = useRef();
  return (
    <div
      className={cl.page}
      ref={adminRef}
      tabIndex={-1}
      // onKeyDown={e => e.code === 'Escape' && closePopup()}
    >
      <h1>Admin panel</h1>
      <div className={cl.row}>
        <ul className={cl.list}>
          <li className={cl.item}>
            <Link to='types'>Types</Link>
            <span className={cl.slash}>/</span>
          </li>
          <li className={cl.item}>
            <Link to='brands'>Brands</Link>
            <span className={cl.slash}>/</span>
          </li>
          <li className={cl.item}>
            <Link to='devices'>Devices</Link>
            <span className={cl.slash}>/</span>
          </li>
          <li className={cl.item}>
            <Link to='users'>Users</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export { AdminPage };
