import './styles/App.css';
import './styles/container.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useRef } from 'react';
import { useAuth } from './hook/useAuth';

const App = () => {
  const appRef = useRef();
  const { stores } = useAuth();
  return (
    <div
      className='App'
      ref={appRef}
      // tabIndex={-1}
      onKeyDown={e => e.code === 'Escape' && stores.modal.setIsClose(true)}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
