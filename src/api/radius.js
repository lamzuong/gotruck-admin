import axiosClient from './axiosClient';

const radiusAPI = {
  getHistoryChange: () => {
    const url = '/radius';
    return axiosClient.get(url);
  },
  putRadius: (dataSend) => {
    const url = '/radius';
    return axiosClient.put(url, dataSend);
  },
};
export default radiusAPI;
