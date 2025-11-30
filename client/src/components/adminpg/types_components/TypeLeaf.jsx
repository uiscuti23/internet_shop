import { useLocation, useParams } from 'react-router-dom';

const TypeLeaf = () => {
  // const { id } = useParams();
  const location = useLocation();
  const typeName = location.state;
  console.log(typeName);
  return (
    <div>
      <h2>{typeName}</h2>
    </div>
  );
};

export { TypeLeaf };
