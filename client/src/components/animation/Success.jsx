import cl from '../../styles/animation/success.module.css';
import { observer } from 'mobx-react-lite';

const Success = observer(({ message, errorText, isSuccessActive, isError }) => {
  return (
    <div className={cl.res__row}>
      <div className={cl.res__text}>
        {isSuccessActive && <span className={cl.res__message}>{message}</span>}
        {isError && <span className={cl.res__error}>{errorText}</span>}
      </div>
      <div className={isSuccessActive ? cl.success + ' ' + cl.active : cl.success}>
        <div className={cl.success__part + ' ' + cl.part_one}></div>
        <div className={cl.success__part + ' ' + cl.part_two}></div>
      </div>
    </div>
  );
});

export { Success };
