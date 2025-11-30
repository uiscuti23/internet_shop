import cl from '../../../styles/adminpg/create_ui/reset_icon_button.module.css';
import closeIcon from '../../../assets/types_page/close.png';

const ResetIconButton = ({ isResetBtnShow, ...props }) => {
  return (
    <button
      className={isResetBtnShow ? cl.reset_button + ' ' + cl.show : cl.reset_button}
      {...props}>
      <img src={closeIcon} alt='close' />
    </button>
  );
};

export { ResetIconButton };
