import cl from '../../styles/adminpg/brands/brands_admin.module.css';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../../hook/useAuth';
import { useSearchParams } from 'react-router-dom';
import { LoaderDual } from '../animation/LoaderDual';
import { NotFound } from '../NotFound';
import { BrandsCol } from './brands_components/BrandsCol';
import { BrandsCreate } from './brands_components/BrandsCreate';
import { AdminFilter } from '../forms/AdminFilter';
import { NewModal } from '../NewModal';

const BrandsAdmin = observer(() => {
  const { stores, getBrands, closePopup } = useAuth();
  const brands = stores.brand.brands;
  const isLoading = stores.brand.isLoading;

  useEffect(() => {
    stores.brand.setIsLoading(true);
    getBrands();
  }, []);

  const [brandModalIsActive, setBrandModalIsActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const brandQuery = searchParams.get('variable') || '';

  const filterBrands = brands =>
    brands.filter(brand => brand.name.toLowerCase().includes(brandQuery.toLowerCase()));

  const filteredBrands = filterBrands(brands);

  const sortBrands = (a, b) => a.name.localeCompare(b.name);

  const filterParams = {
    varQuery: brandQuery,
    setSearchParams,
    varArr: brands,
    varName: 'brand',
  };

  return (
    <div className={cl.table}>
      <h2>Brands</h2>
      <AdminFilter filterParams={filterParams} setModalIsActive={setBrandModalIsActive}>
        <NewModal
          isActive={brandModalIsActive}
          setIsActive={setBrandModalIsActive}
          closePopup={closePopup}
          title={'Create new brand'}>
          <BrandsCreate isActive={brandModalIsActive} setIsActive={setBrandModalIsActive} />
        </NewModal>
      </AdminFilter>
      {isLoading ? (
        <div className={cl.loader_wrapper}>
          <LoaderDual />
        </div>
      ) : (
        <div className={cl.table__row}>
          {filteredBrands.length === 0 && <NotFound element='Brands' />}
          {filteredBrands.length !== 0 && (
            <ul className={cl.columns__row}>
              {filteredBrands
                .slice()
                .sort(sortBrands)
                .map(brand => (
                  <BrandsCol key={brand.id} brand={brand} />
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
});

export { BrandsAdmin };
