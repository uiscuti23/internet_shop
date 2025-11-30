import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { Main } from './sections/Main';
import { useEffect, useRef, useState } from 'react';
import { LoaderDual } from './animation/LoaderDual';
import { useAuth } from '../hook/useAuth';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

const Layout = observer(() => {
  const layoutRef = useRef();
  const { stores, checkAuth, getLocalhost, checkAndGetTypes } = useAuth();

  const isLoading = stores.user.isLoading;

  const location = useLocation();
  const isChangedLocation = location.pathname.slice(0, 12) === '/admin/types';

  const draggedTypes = getLocalhost('draggedTypes');
  const isDraggedTypes = Boolean((draggedTypes ?? '').length);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isDraggedTypes) {
      stores.type.setIsLoading(true);
      checkAndGetTypes(isDraggedTypes, draggedTypes);
    }
  }, [isChangedLocation]);

  useEffect(() => {
    stores.global.setLocation(location.pathname);
    checkIsHaveScroll();
  }, [location.pathname]);

  const checkIsHaveScroll = () => {
    const layoutElem = layoutRef?.current;
    const bodyElem = layoutElem?.parentElement.parentElement.parentElement;

    if (!layoutElem || !bodyElem) {
      setTimeout(() => {
        checkIsHaveScroll();
      }, 100);
    } else {
      stores.global.setIsHaveScroll(!(layoutElem.offsetHeight === bodyElem.offsetHeight));
    }
  };

  const [userMenu, setUserMenu] = useState(false);

  const closeUserMenu = e => {
    if (!e.target.closest('.auth-action')) {
      setUserMenu(false);
    }
  };

  const userMenuParams = { userMenu, setUserMenu };

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LoaderDual />
      </div>
    );
  }

  return (
    <div className='layout' ref={layoutRef} onClick={closeUserMenu}>
      <Header params={userMenuParams} />
      <Main />
      <Footer />
    </div>
  );
});

export { Layout };
