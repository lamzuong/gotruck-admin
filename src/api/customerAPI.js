import axiosClient from './axiosClient';

const customerAPI = {
  getAll: () => {
    const url = '/customer';
    return axiosClient.get(url);
  },
  getCusById: (id) => {
    const url = `/customer/byId/${id}`;
    return axiosClient.get(url);
  },
  getByNoPage: (params) => {
    const url = `/customer/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/customer/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/customer/search?page=${params.page}&limit=${params.limit}&idCustomer=${params.idCustomer}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/customer/search?idCustomer=${params.idCustomer}`;
    return axiosClient.get(url);
  },
  block: (id) => {
    const url = `/customer/block/${id}`;
    return axiosClient.put(url);
  },
};
export default customerAPI;
