import { Link, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();
  const message = location.state?.message || '';

  return (
    <div>
      <h2>Page not found!</h2>
      {message}
      Back to <Link to='/'>home</Link>
    </div>
  );
};

export { NotFoundPage };
