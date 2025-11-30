import cl from '../../../styles/adminpg/create_ui/error_string.module.css';

const ErrorString = ({ error }) => {
  return <div className={cl.error_string}>{error}</div>;
};

export { ErrorString };
