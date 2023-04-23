import axiosClient from './axiosClient';

const shipperAPI = {
  getAll: () => {
    const url = '/shipperAdmin';
    return axiosClient.get(url);
  },
  getShipperById: (id) => {
    const url = `/shipperAdmin/byId/${id}`;
    return axiosClient.get(url);
  },
  getByNoPage: (params) => {
    const url = `/shipperAdmin/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/shipperAdmin/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/shipperAdmin/search?page=${params.page}&limit=${params.limit}&idShipper=${params.idShipper}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/shipperAdmin/search?idShipper=${params.idShipper}`;
    return axiosClient.get(url);
  },
  block: (id) => {
    const url = `/shipperAdmin/block/${id}`;
    return axiosClient.put(url);
  },
  recharge: (id, dataSend) => {
    const url = `/shipperAdmin/recharge/${id}`;
    return axiosClient.put(url, dataSend);
  },
};
export default shipperAPI;
