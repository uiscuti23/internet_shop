import '../../styles/header.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import iconsearch from '../../assets/header_icons/iconsearch.svg';
import iconcart from '../../assets/header_icons/iconcart.svg';
import iconuser from '../../assets/header_icons/iconuser.svg';
import { SuccessIndicator } from '../UI/indicators/SuccessIndicator';
import { useAuth } from '../../hook/useAuth';
import { UserComponentsList } from '../layout_elements/UserComponentsList';
import { observer } from 'mobx-react-lite';

const Header = observer(({ params }) => {
  const { userMenu, setUserMenu } = params;

  const { stores } = useAuth();
  const isAuth = stores.user.isAuth;
  const isLocked = stores.global.appIsLocked;
  const isHaveScroll = stores.global.isHaveScroll;

  const location = useLocation();

  const navigate = useNavigate();

  const showUserMenuOrNavigateToLogin = () => {
    isAuth ? setUserMenu(!userMenu) : navigate('/login', { state: { from: location } });
  };

  return (
    <header className={isLocked && isHaveScroll ? 'header lock__element' : 'header'}>
      <div className='header__container _container'>
        <div className='header__row'>
          <div className='header__leftside'>
            <Link to='/' className='header__logo'>
              Device Shop
            </Link>
          </div>
          <div className='header__rightside'>
            <div className='header__action'>
              <img className='iconsearch' src={iconsearch} alt='search' />
            </div>
            <Link to='basket' className='header__action'>
              <img className='iconcart' src={iconcart} alt='basket' />
            </Link>
            <div className='header__action auth-action' onClick={showUserMenuOrNavigateToLogin}>
              <img className='iconuser' src={iconuser} alt='user' />
              {isAuth && <SuccessIndicator />}
              {userMenu && <UserComponentsList navigate={navigate} location={location} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

export { Header };
