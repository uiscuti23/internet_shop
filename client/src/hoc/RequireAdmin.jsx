import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

export const RequireAdmin = ({ children }) => {
  const location = useLocation();

  const { stores } = useAuth();
  const userRole = stores.user.user.role;

  if (userRole !== 'ADMIN') {
    return (
      <Navigate
        to='/'
        state={{
          message: 'Register as an administrator in order to access the page',
          from: location,
        }}
      />
    );
  }

  return children;
};
