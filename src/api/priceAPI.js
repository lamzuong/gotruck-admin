import axiosClient from './axiosClient';

const priceAPI = {
  getAllTransportPrice: () => {
    const url = '/priceadmin';
    return axiosClient.get(url);
  },
  putransportPrice: (params) => {
    const url = '/priceadmin/';
    return axiosClient.put(url, params);
  },
  getByNoPageHistory: () => {
    const url = `/priceadmin/history/pagination`;
    return axiosClient.get(url);
  },
  getByPageHistory: (params) => {
    const url = `/priceadmin/history/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
};
export default priceAPI;
