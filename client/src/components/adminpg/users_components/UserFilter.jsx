import cl from '../../../styles/adminpg/users/admin_user_filter.module.css';
import { useState } from 'react';

import { AdminChangeFormItem } from './AdminChangeFormItem';
import { SearchInput } from '../../UI/inputs/SearchInput';

const UserFilter = ({ emailQuery, roleQuery, setSearchParams }) => {
  const [search, setSearch] = useState(emailQuery);
  const [radioValue, setRadioValue] = useState(roleQuery);

  const changeRadioValue = newVal => setRadioValue(newVal);

  const handleSubmit = e => {
    e.preventDefault();
    const emailInForm = e.target.search.value;
    const params = {};

    if (emailInForm.length) {
      params.email = emailInForm;
    }
    params.role = radioValue;

    setSearchParams(params);
  };

  const resetSearch = e => {
    e.preventDefault();
    setSearch('');
    setRadioValue('all');

    const params = {
      email: '',
      role: 'all',
    };
    setSearchParams(params);
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit} className={cl.user_filter}>
      <div className={cl.form__row}>
        <div className={cl.search__row}>
          <SearchInput
            name='search'
            placeholder='search by email'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className={cl.radio__row}>
            <AdminChangeFormItem
              value={radioValue}
              currentValue='all'
              userId=''
              idClass='_radio_change_'
              callback={changeRadioValue}
            />
            <AdminChangeFormItem
              value={radioValue}
              currentValue='user'
              userId=''
              idClass='_radio_change_'
              callback={changeRadioValue}
            />
            <AdminChangeFormItem
              value={radioValue}
              currentValue='seller'
              userId=''
              idClass='_radio_change_'
              callback={changeRadioValue}
            />
            <AdminChangeFormItem
              value={radioValue}
              currentValue='admin'
              userId=''
              idClass='_radio_change_'
              callback={changeRadioValue}
            />
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
  );
};

export { UserFilter };
