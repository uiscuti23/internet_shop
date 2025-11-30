import { $host, $authHost } from './index';

export const createType = async type => {
  const { data } = await $authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get('api/type');
  return data;
};

export const fetchOneType = async id => {
  const { data } = await $host.get(`api/type/${id}`);
  return data;
};

export const changeType = async (id, order) => {
  const { data } = await $authHost.put('api/type', { id, order });
  return data;
};

export const deleteType = async id => {
  const { data } = await $authHost.delete(`api/type/${id}`);
  return data;
};
