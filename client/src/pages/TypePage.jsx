import cl from '../styles/typepg/type_page.module.css';
import { useEffect } from 'react';
import { useAuth } from '../hook/useAuth';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeSearchFilter } from '../components/typepg/TypeSearchFilter';

const TypePage = observer(() => {
  const location = useLocation();
  const { name } = location.state;
  // const { stores, getTypes } = useAuth();
  // const types = stores.type.types;
  // console.log(types);

  useEffect(() => {
    // stores.type.setIsLoading(true);
    // getTypes();
  }, []);

  return (
    <div className={cl.type_page}>
      <div className={cl.type_heading}>
        <h2>{name}</h2>
        <TypeSearchFilter />
      </div>
    </div>
  );
});

export { TypePage };
