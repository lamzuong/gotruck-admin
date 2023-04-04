import axiosClient from './axiosClient';

const loginAPI = {
  login: (params) => {
    const url = `/admin?username=${params.username}&password=${params.password}`;
    return axiosClient.get(url);
  },
  changePass: (params) => {
    const url = `/admin?id=${params.id}&newPassword=${params.password}`;
    return axiosClient.put(url);
  },
};

export default loginAPI;
