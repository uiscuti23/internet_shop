import cl from '../../../styles/UI/inputs/ChangeInput.module.css';

const ChangeInput = ({ isHide, ...props }) => {
  return (
    <input
      className={isHide ? cl.hide__input + ' ' + cl.change__input : cl.change__input}
      {...props}
    />
  );
};

export { ChangeInput };
