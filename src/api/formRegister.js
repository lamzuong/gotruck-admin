import axiosClient from './axiosClient';

const formRegisterAPI = {
  getAll: () => {
    const url = '/formregister';
    return axiosClient.get(url);
  },
  put: (params) => {
    const url = '/formregister';
    return axiosClient.put(url, params);
  },
  getByNoPage: () => {
    const url = `/formregister/pagination`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/formregister/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/formregister/search?page=${params.page}&limit=${params.limit}&idForm=${params.idForm}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/formregister/search?idForm=${params.idForm}`;
    return axiosClient.get(url);
  },

  getByNoPageHistory: (params) => {
    const url = `/formregister/history/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPageHistory: (params) => {
    const url = `/formregister/history/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  searchHistory: (params) => {
    const url = `/formregister/history/search?page=${params.page}&limit=${params.limit}&idForm=${params.idForm}&status=${params.status}`;
    return axiosClient.get(url);
  },
  searchNoPageHistory: (params) => {
    const url = `/formregister/history/search?idForm=${params.idForm}`;
    return axiosClient.get(url);
  },
};
export default formRegisterAPI;
