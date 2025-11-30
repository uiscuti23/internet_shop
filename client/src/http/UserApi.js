import { $host, $authHost } from './index';
import { jwtDecode } from 'jwt-decode';

export const registration = async (email, password) => {
  const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const fetchUsers = async () => {
  const { data } = await $host.get('api/user');
  return data;
};

export const fetchOneUser = async email => {
  const { data } = await $host.get(`api/user/${email}`);
  return data;
};

export const changeUser = async (email, newEmail, role) => {
  const { data } = await $host.put('api/user/change', { email, newEmail, role });
  return data;
};

export const deleteUser = async email => {
  const { data } = await $host.delete(`api/user/${email}`);
  return data;
};
