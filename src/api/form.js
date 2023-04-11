import axiosClient from './axiosClient';

const formAPI = {
  getAllFormRegister: () => {
    const url = '/form/register';
    return axiosClient.get(url);
  },
  putFormRegister: (params) => {
    const url = '/form/register';
    return axiosClient.put(url, params);
  },
};
export default formAPI;
