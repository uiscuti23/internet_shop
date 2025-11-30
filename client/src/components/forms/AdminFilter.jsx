import cl from '../../styles/adminpg/types/types_type_filter.module.css';
import { useState } from 'react';
import { SearchInput } from '../UI/inputs/SearchInput';
import { useAuth } from '../../hook/useAuth';
import { observer } from 'mobx-react-lite';

const AdminFilter = observer(({ filterParams, setModalIsActive, children }) => {
  const { openPopup } = useAuth();

  const { varQuery, setSearchParams, varArr, varName } = filterParams;
  const [search, setSearch] = useState(varQuery);

  const handleSubmit = e => {
    e.preventDefault();
    const varInForm = e.target.search.value;
    const params = {};

    if (varInForm.length) {
      params.variable = varInForm;
    }
    setSearchParams(params);
  };

  const resetSearch = e => {
    e.preventDefault();
    setSearch('');

    const params = {
      variable: '',
    };
    setSearchParams(params);
  };

  return (
    <>
      <form autoComplete='off' onSubmit={handleSubmit} className={cl.admin_filter}>
        <div className={cl.form__row}>
          <div className={cl.search__row}>
            <SearchInput
              name='search'
              placeholder='search'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className={cl.add__btn} onClick={() => openPopup(setModalIsActive)}>
              Add new {varName}
            </div>
          </div>
        </div>
        <div className={cl.buttons__row}>
          <input type='submit' value='Search' className={cl.search_button} />
          <button className={cl.reset_button} onClick={resetSearch}>
            Reset search
          </button>
        </div>
      </form>
      {children}
    </>
  );
});

export { AdminFilter };
