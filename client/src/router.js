import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';
import { BasketPage } from './pages/BasketPage';
import { DevicePage } from './pages/DevicePage';
import { RequireAuth } from './hoc/RequireAuth';

import { TypesAdmin } from './components/adminpg/TypesAdmin';
import { BrandsAdmin } from './components/adminpg/BrandsAdmin';
import { DevicesAdmin } from './components/adminpg/DevicesAdmin';
import { UsersAdmin } from './components/adminpg/UsersAdmin';
import { AuthProvider } from './hoc/AuthProvider';
import { RequireAdmin } from './hoc/RequireAdmin';
import { RefreshTypes } from './hoc/RefreshTypes';
import { TypePage } from './pages/TypePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path='admin/*'
        element={
          <RequireAdmin>
            <AdminPage />
          </RequireAdmin>
        }>
        <Route path='types' element={<TypesAdmin />} />
        <Route path='brands' element={<BrandsAdmin />} />
        <Route path='devices' element={<DevicesAdmin />} />
        <Route path='users' element={<UsersAdmin />} />
      </Route>
      <Route path='login' element={<AuthPage />} />
      <Route path='registration' element={<AuthPage />} />
      <Route
        path='basket'
        element={
          <RequireAuth>
            <BasketPage />
          </RequireAuth>
        }
      />
      <Route path='device/:id' element={<DevicePage />} />
      <Route path='type/:id' element={<TypePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
