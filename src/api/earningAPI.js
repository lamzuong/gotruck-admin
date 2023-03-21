import axiosClient from './axiosClient';

const earningApi = {
  getEarningToday: () => {
    const url = `/earning/today`;
    return axiosClient.get(url);
  },
  getEarningWeek: () => {
    const url = '/earning/week';
    return axiosClient.get(url);
  },
  getEarningMonth: () => {
    const url = '/earning/month';
    return axiosClient.get(url);
  },
  getEarningSpecific: (params) => {
    const url = `/earning/specific?startDate=${params.startDate}&endDate=${params.endDate}`;
    return axiosClient.get(url);
  },
};

export default earningApi;
