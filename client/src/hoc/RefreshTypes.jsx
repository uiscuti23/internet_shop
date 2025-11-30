import { useLocation } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useEffect, useState } from 'react';
import { LoaderDual } from '../components/animation/LoaderDual';

export const RefreshTypes = ({ children }) => {
  const { getLocalhost, checkAndGetTypes } = useAuth();
  const [isLoad, setIsLoad] = useState(false);

  const draggedTypes = getLocalhost('draggedTypes');
  const isDraggedTypes = Boolean((draggedTypes ?? '').length);
  const location = useLocation();
  const isChangeType = isDraggedTypes && location.pathname !== '/admin/types';

  useEffect(() => {
    if (isChangeType) {
      setIsLoad(true);
      checkAndGetTypes(isDraggedTypes, draggedTypes).then(() => setIsLoad(false));
    }
  }, [draggedTypes]);

  return (
    <>
      {isLoad ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LoaderDual />
        </div>
      ) : (
        children
      )}
    </>
  );
  // return <>{children}</>;
};
