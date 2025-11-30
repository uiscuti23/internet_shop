import cl from '../styles/UI/notfound/NotFound.module.css';

const NotFound = ({ element }) => {
  return <div className={cl.not_found}>{element} Not Found!</div>;
};

export { NotFound };
