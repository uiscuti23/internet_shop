import '../styles/new_modal.css';
import closeIcon from '../assets/types_page/close.png';
import { useEffect } from 'react';
import { useAuth } from '../hook/useAuth';
import { observer } from 'mobx-react-lite';

const NewModal = observer(
  ({ isActive, setIsActive, closePopup, isNested, setIsParentActiveValue, title, children }) => {
    const doUnlock = !isNested;
    const { stores } = useAuth();
    const isClose = stores.modal.isClose;

    useEffect(() => {
      closeModal();
    }, [isClose]);

    const closeModal = async () => {
      if (!isClose || !isActive) return;
      await closePopup(setIsActive, doUnlock, setIsParentActiveValue);
      stores.modal.setIsClose(false);
    };

    return (
      <div className={isActive ? 'popup open' : 'popup'}>
        <div
          className='popup__area'
          onClick={() => closePopup(setIsActive, doUnlock, setIsParentActiveValue)}></div>
        <div className='popup__body'>
          <div className='popup__content'>
            <div
              className='popup__close'
              onClick={() => closePopup(setIsActive, doUnlock, setIsParentActiveValue)}>
              <img src={closeIcon} alt='' />
            </div>
            <div className='popup__title'>{title}</div>
            <div className='popup__main'>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

export { NewModal };
