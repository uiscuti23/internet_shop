import cl from '../../styles/adminpg/types/types_admin.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hook/useAuth';
import { useSearchParams } from 'react-router-dom';
import { LoaderDual } from '../animation/LoaderDual';
import { NotFound } from '../NotFound';
import { observer } from 'mobx-react-lite';
import { TypesCol } from './types_components/TypesCol';
import { AdminFilter } from '../forms/AdminFilter';
import { TypeCreate } from './types_components/TypeCreate';
import { NewModal } from '../NewModal';

const TypesAdmin = observer(() => {
  const { stores, setLocalhost, getLocalhost, getTypes, closePopup } = useAuth();

  const types = stores.type.types;
  const isLoading = stores.type.isLoading;
  // const draggedTypes = getLocalhost('draggedTypes');
  // const isDraggedTypes = Boolean((draggedTypes ?? '').length);

  useEffect(() => {
    stores.type.setIsLoading(true);
    getTypes();
  }, []);

  const [currentCard, setCurrentCard] = useState(null);
  const [aboveCard, setAboveCard] = useState(null);

  const [typeModalIsActive, setTypeModalIsActive] = useState(false);

  const sortCards = (a, b) => a.order - b.order;

  const [searchParams, setSearchParams] = useSearchParams();
  const typeQuery = searchParams.get('variable') || '';

  const filterTypes = types =>
    types.filter(type => type.name.toLowerCase().includes(typeQuery.toLowerCase()));

  const filteredTypes = filterTypes(types);

  const dragStartHandler = (e, card) => {
    setCurrentCard(card);
  };
  const dragEndHandler = e => setAboveCard(null);
  const dragOverHandler = (e, card) => {
    e.preventDefault();
    if (card.id !== aboveCard) {
      setAboveCard(card.id);
    }
  };
  const dropHandler = (e, card) => {
    e.preventDefault();
    const isDragBack = currentCard.id === aboveCard && card.order === currentCard.order;
    if (isDragBack) return false;

    stores.type.setTypes(
      types.map(c => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
    const draggedCards = [
      [currentCard.id, card.order],
      [aboveCard, currentCard.order],
    ];
    const lastDraggedCards = getLocalhost('draggedTypes');

    const allDraggedCards = concatUnuqueElems(lastDraggedCards, draggedCards);
    setLocalhost('draggedTypes', allDraggedCards);
    setCurrentCard(null);
    setAboveCard(null);
  };

  function concatUnuqueElems(defArr, newArr) {
    if (defArr) {
      const indexToDelete = [];

      const changedDef = defArr.map(item => {
        const finded = newArr.find((i, index) => {
          const res = i[0] === item[0];
          if (res) {
            indexToDelete.push(index);
          }
          return res;
        });
        return finded ?? item;
      });
      const uniqueNewArr = newArr.filter((i, ind) => !indexToDelete.includes(ind));
      const unique = changedDef.concat(uniqueNewArr);

      const typesArr = getLocalhost('sourceTypes');
      const coinInd = [];
      unique.forEach((item, index) => {
        const res = typesArr.find(i => i[0] === item[0])[1] === item[1];
        if (res) {
          coinInd.push(index);
        }
        return res;
      });
      const changedCards = unique.filter((i, ind) => !coinInd.includes(ind));

      return changedCards;
    } else {
      return newArr;
    }
  }

  const dragEventFunc = { dragStartHandler, dragEndHandler, dragOverHandler, dropHandler };
  const filterParams = {
    varQuery: typeQuery,
    setSearchParams,
    varArr: types,
    varName: 'type',
  };

  return (
    <div className={cl.table}>
      <h2>Types</h2>
      <AdminFilter filterParams={filterParams} setModalIsActive={setTypeModalIsActive}>
        <NewModal
          isActive={typeModalIsActive}
          setIsActive={setTypeModalIsActive}
          closePopup={closePopup}
          title={'Create new type'}>
          <TypeCreate
            types={types}
            isActive={typeModalIsActive}
            setIsActive={setTypeModalIsActive}
          />
        </NewModal>
      </AdminFilter>
      {isLoading ? (
        <div className={cl.loader_wrapper}>
          <LoaderDual />
        </div>
      ) : (
        <div className={cl.table__row}>
          {filteredTypes.length === 0 && <NotFound element='Types' />}
          {filteredTypes.length !== 0 && (
            <ul className={cl.columns__row}>
              {filteredTypes.sort(sortCards).map(type => (
                <TypesCol
                  key={type.id}
                  dragEventFunc={dragEventFunc}
                  type={type}
                  aboveCard={aboveCard}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
});

export { TypesAdmin };
