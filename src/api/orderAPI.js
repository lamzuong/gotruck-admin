import axiosClient from './axiosClient';

const orderAPI = {
  getAll: () => {
    const url = '/orderAdmin';
    return axiosClient.get(url);
  },

  getByPage: (params) => {
    const url = `/goodsType/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/goodsType/${id}`;
    return axiosClient.get(url);
  },

  add: (params) => {
    const url = `/goodsType`;
    return axiosClient.post(url, { ...params });
  },

  delete: (label) => {
    const url = `/goodsType/${label}`;
    return axiosClient.delete(url);
  },

  search: (keyword = '') => {
    const url = `/goodsType/search/${keyword}`;
    return axiosClient.get(url);
  },
};

export default orderAPI;
