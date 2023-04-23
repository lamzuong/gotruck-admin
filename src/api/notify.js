import axiosClient from './axiosClient';

const notifyAPI = {
  post: (params) => {
    const url = `/notify`;
    return axiosClient.post(url, params);
  },
  get: (param) => {
    const url = `/notify?page=${param.page}&limit=${param.limit}`;
    return axiosClient.get(url);
  },
};
export default notifyAPI;
