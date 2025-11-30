import '../../styles/homepg/catgegory_card.css';

import { useNavigate } from 'react-router-dom';

const CardCategory = ({ category }) => {
  const { name, img, id } = category;
  const navigate = useNavigate();

  // to={`/type/${id}`}
  return (
    <div
      className='category-card'
      onClick={() => {
        navigate(`/type/${id}`, { state: { name } });
      }}>
      <div className='category-card__img'>
        <img src={'http://localhost:5000/' + img} alt={name} />
      </div>
      <p>{name}</p>
    </div>
  );
};

export { CardCategory };
