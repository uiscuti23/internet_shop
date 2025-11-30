import { CardCategory } from '../components/homepg/CardCategory';
import { Chapter } from '../components/homepg/Chap';
import { observer } from 'mobx-react-lite';
import { useAuth } from '../hook/useAuth';
import { LoaderDual } from '../components/animation/LoaderDual';
import { useEffect } from 'react';

const HomePage = observer(() => {
  const { stores, getTypes } = useAuth();
  const categories = stores.type.types;
  const isLoading = stores.type.isLoading;

  useEffect(() => {
    stores.type.setIsLoading(false);
    getTypes();
  }, []);

  const sortCards = (a, b) => a.order - b.order;

  return (
    <div className='homepage'>
      <Chapter heading={'Popular categories'}>
        {isLoading ? (
          <div className='loader_wrapper'>
            <LoaderDual />
          </div>
        ) : (
          categories
            .slice()
            .sort(sortCards)
            .map(category => <CardCategory category={category} key={category.id} />)
        )}
      </Chapter>
    </div>
  );
});

export { HomePage };
