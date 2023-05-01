import axiosClient from './axiosClient';

const feeAppAPI = {
  getHistoryChange: () => {
    const url = '/feeadmin';
    return axiosClient.get(url);
  },
  putFee: (dataSend) => {
    const url = '/feeadmin';
    return axiosClient.put(url, dataSend);
  },
};
export default feeAppAPI;
