import cl from '../../../styles/adminpg/create_ui/create_form_item.module.css';

const CreateFormItem = ({ heading, children }) => {
  return (
    <div className={cl.form__item}>
      <label className={cl.input__label}>
        <div className={cl.input__heading}>{heading}</div>
        {children}
      </label>
    </div>
  );
};

export { CreateFormItem };
