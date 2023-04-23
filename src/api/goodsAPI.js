import axiosClient from './axiosClient';

const goodsApi = {
  getAll: () => {
    const url = '/goodsType';
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

  delete: (param) => {
    const url = `/goodsType/delete`;
    return axiosClient.put(url, param);
  },

  search: (keyword = '') => {
    const url = `/goodsType/search/${keyword}`;
    return axiosClient.get(url);
  },
  put: (params) => {
    const url = `/goodsType`;
    return axiosClient.put(url, { ...params });
  },
};

export default goodsApi;
