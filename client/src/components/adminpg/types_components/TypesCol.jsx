import cl from '../../../styles/adminpg/types/types_column.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hook/useAuth';

const TypesCol = ({ dragEventFunc, type, aboveCard }) => {
  const { dragStartHandler, dragEndHandler, dragOverHandler, dropHandler } = dragEventFunc;

  // const isSelected = type.id === selectedId;
  const { deleteCurrentType } = useAuth();

  // const navigate = useNavigate();

  const deleteType = e => {
    e.preventDefault();
    deleteCurrentType(type.id);
  };

  // const handleClick = e => {
  //   e.preventDefault();
  //   select(type.id);
  //   navigate(`/type/${type.id}`, { state: type.name });
  // };
  return (
    <li
      onDragStart={e => dragStartHandler(e, type)}
      onDragLeave={e => dragEndHandler(e)}
      onDragEnd={e => dragEndHandler(e)}
      onDragOver={e => dragOverHandler(e, type)}
      onDrop={e => dropHandler(e, type)}
      draggable
      className={type.id === aboveCard ? cl.card + ' ' + cl.above : cl.card}>
      <div className={cl.card__img}>
        <img src={'http://localhost:5000/' + type.img} alt={type.name} />
      </div>
      <p>{type.name}</p>
      {/* <button onClick={deleteType}>Delete</button> */}
    </li>
  );
};

export { TypesCol };
