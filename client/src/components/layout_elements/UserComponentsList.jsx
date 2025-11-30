import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import cl from '../../styles/layout_elements/UserComponentList.module.css';

const UserComponentsList = ({ navigate, location }) => {
  const { logOut, stores } = useAuth();
  const userRole = stores.user.user.role;

  const changeAuth = () => {
    logOut();
    navigate('/login', { state: { from: location } });
  };

  return (
    <ul className={cl.list}>
      {userRole === 'ADMIN' && (
        <li className={cl.item}>
          <Link to='/admin'>Admin panel</Link>
        </li>
      )}
      {userRole === 'SELLER' && (
        <li className={cl.item}>
          <Link>Seller panel</Link>
        </li>
      )}
      <li className={cl.item} onClick={changeAuth}>
        Change user
      </li>
      <li className={cl.item} onClick={logOut}>
        Leave account
      </li>
    </ul>
  );
};

export { UserComponentsList };
