import axiosClient from './axiosClient';

const formVehicleAPI = {
  put: (params) => {
    const url = '/formvehicle';
    return axiosClient.put(url, params);
  },
  getByNoPage: () => {
    const url = `/formvehicle/pagination`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/formvehicle/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/formvehicle/search?page=${params.page}&limit=${params.limit}&idTruck=${params.id_truck}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/formvehicle/search?idTruck=${params.id_truck}`;
    return axiosClient.get(url);
  },

  getByNoPageHistory: (params) => {
    const url = `/formvehicle/history/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPageHistory: (params) => {
    const url = `/formvehicle/history/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  searchHistory: (params) => {
    const url = `/formvehicle/history/search?page=${params.page}&limit=${params.limit}&idTruck=${params.id_truck}&status=${params.status}`;
    return axiosClient.get(url);
  },
  searchNoPageHistory: (params) => {
    const url = `/formvehicle/history/search?idTruck=${params.id_truck}`;
    return axiosClient.get(url);
  },
};
export default formVehicleAPI;
