import axiosClient from './axiosClient';

const priceAPI = {
  getAllTransportPrice: () => {
    const url = '/priceadmin';
    return axiosClient.get(url);
  },
  putFormRegister: (params) => {
    const url = '/priceadmin/';
    return axiosClient.put(url, params);
  },
};
export default priceAPI;
