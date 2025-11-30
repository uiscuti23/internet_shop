import cl from '../../../styles/adminpg/users/admin_caption.module.css';
import arrowDown from '../../../assets/admin_page/arrowDown.svg';

const FilterArrows = ({ setSortBy, sortStrFirst, sortStrSecond }) => {
  return (
    <div className={cl.filter_arrows}>
      <div className={cl.filter_arrow__down}>
        <img
          className={cl.arrow_down}
          src={arrowDown}
          alt='arrow'
          onClick={() => setSortBy(sortStrFirst)}
        />
      </div>
      <div className={cl.filter_arrow__up}>
        <img
          className={cl.arrow_up}
          src={arrowDown}
          alt='arrow'
          onClick={() => setSortBy(sortStrSecond)}
        />
      </div>
    </div>
  );
};

export { FilterArrows };
