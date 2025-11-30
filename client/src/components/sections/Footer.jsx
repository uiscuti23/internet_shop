import { observer } from 'mobx-react-lite';
import '../../styles/footer.css';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const Footer = observer(() => {
  const { stores } = useAuth();
  const isLocked = stores.global.appIsLocked;
  const isHaveScroll = stores.global.isHaveScroll;
  return (
    <footer className={isLocked && isHaveScroll ? 'footer lock__element' : 'footer'}>
      <div className='footer__container _container'>
        <div className='footer__row'>
          <div className='footer__leftside'>
            <h2>Contacts</h2>
            <Link className='footer__link' to='/'>
              +1 234-567-8910
            </Link>
            <p>New Work Sity</p>
          </div>
          <div className='footer__rightside right-footer'>
            <div className='right-footer__row'>
              <div className='right-footer__col'>
                <Link className='footer__link' to='/'>
                  magazine
                </Link>
                <Link className='footer__link' to='/'>
                  promotions
                </Link>
                <Link className='footer__link' to='/'>
                  forum
                </Link>
              </div>
              <div className='right-footer__col'>
                <Link className='footer__link' to='/'>
                  news
                </Link>
                <Link className='footer__link' to='/'>
                  delivery
                </Link>
                <Link className='footer__link' to='/'>
                  warranty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export { Footer };
