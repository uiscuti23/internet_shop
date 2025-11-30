import cl from '../../styles/typepg/type_search_filter.module.css';
import { useState } from 'react';
import closeIcon from '../../assets/types_page/close.png';

const TypeSearchFilter = () => {
  const [search, setSearch] = useState('');
  const handleSubmit = e => {};
  const resetSearch = e => {
    e.preventDefault();
  };
  return (
    <form autoComplete='off' onSubmit={handleSubmit} className={cl.type_filter}>
      <div className={cl.search_item}>
        <input
          className={cl.search_input}
          name='search_devices'
          placeholder='find by name, model...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          type='text'
        />
        <button className={cl.reset_button} onClick={resetSearch}>
          <img src={closeIcon} alt='' />
        </button>
      </div>
      <input type='submit' value='Search' className={cl.search_button} />
    </form>
  );
};

export { TypeSearchFilter };
