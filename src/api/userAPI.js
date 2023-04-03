import axiosClient from './axiosClient';

const loginAPI = {
  login: (params) => {
    const url = `/admin?username=${params.username}&password=${params.password}`;
    return axiosClient.get(url);
  },
};

export default loginAPI;
