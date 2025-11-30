import { observer } from 'mobx-react-lite';
import { useAuth } from '../../hook/useAuth';
import '../../styles/main.css';
import { Outlet } from 'react-router-dom';

const Main = observer(() => {
  const { stores } = useAuth();
  const isLocked = stores.global.appIsLocked;
  const isHaveScroll = stores.global.isHaveScroll;

  return (
    <main className={isLocked && isHaveScroll ? 'page lock__element' : 'page'}>
      <div className='page__container _container'>
        <Outlet />
      </div>
    </main>
  );
});

export { Main };
