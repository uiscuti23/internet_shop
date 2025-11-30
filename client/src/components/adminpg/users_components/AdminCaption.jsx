import cl from '../../../styles/adminpg/users/admin_caption.module.css';
import { FilterArrows } from './FilterArrows';

const AdminCaption = ({ setSortBy }) => {
  return (
    <div className={cl.caption}>
      <div className={cl.caption__row}>
        <div className={cl.caption__email + ' ' + cl.caption__item}>
          <span>Email</span>
          <FilterArrows setSortBy={setSortBy} sortStrFirst='email' sortStrSecond='emailRev' />
        </div>
        <div className={cl.caption__createdAt + ' ' + cl.caption__item}>
          <span>Created in</span>
          <FilterArrows
            setSortBy={setSortBy}
            sortStrFirst='createdDate'
            sortStrSecond='createdDateRev'
          />
        </div>
        <div className={cl.caption__updatedAt + ' ' + cl.caption__item}>
          <span>Changed in</span>
          <FilterArrows
            setSortBy={setSortBy}
            sortStrFirst='updatedDate'
            sortStrSecond='updatedDateRev'
          />
        </div>
      </div>
    </div>
  );
};

export { AdminCaption };
