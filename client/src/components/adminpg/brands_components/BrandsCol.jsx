import cl from '../../../styles/adminpg/brands/brands_column.module.css';
import { useAuth } from '../../../hook/useAuth';

const BrandsCol = ({ brand }) => {
  const { deleteCurrentBrand } = useAuth();

  const deleteBrand = e => {
    e.preventDefault();
    deleteCurrentBrand(brand.id);
  };

  return (
    <li className={cl.card} key={brand.id}>
      <div className={cl.card__img}>
        <img src={'http://localhost:5000/' + brand.img} alt={brand.name} />
      </div>
      <p>{brand.name}</p>
      {/* <button onClick={deleteBrand}>Delete</button> */}
    </li>
  );
};

export { BrandsCol };
