import axiosClient from './axiosClient';

const orderAPI = {
  getAll: () => {
    const url = '/orderAdmin';
    return axiosClient.get(url);
  },
  getByNoPage: (params) => {
    const url = `/orderAdmin/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/orderAdmin/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/orderAdmin/search?page=${params.page}&limit=${params.limit}&idCustomer=${params.idCustomer}&idShipper=${params.idShipper}&idOrder=${params.idOrder}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/orderAdmin/search?idCustomer=${params.idCustomer}&idShipper=${params.idShipper}&idOrder=${params.idOrder}`;
    return axiosClient.get(url);
  },
};

export default orderAPI;
