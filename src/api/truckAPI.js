import axiosClient from './axiosClient';

const truckAPI = {
  getTruckPrice: () => {
    const url = '/transportPrice';
    return axiosClient.get(url);
  },

  getTruckPriceByIdTruck: (id) => {
    const url = `/transportPrice/byId/${id}`;
    return axiosClient.get(url);
  },

  addTruckPrice: (params) => {
    const url = '/transportPrice';
    return axiosClient.post(url, params);
  },

  deleteTruckPrice: (id) => {
    const url = `/transportPrice/delete/${id}`;
    return axiosClient.delete(url);
  },

  getTruckType: () => {
    const url = `/transportPrice/trucktype`;
    return axiosClient.get(url);
  },

  getTruckTypeByName: (name) => {
    const url = `/transportPrice/trucktype/byname/${name}`;
    return axiosClient.get(url);
  },

  getTruckTypePagination: (params) => {
    const url = `/transportPrice/trucktype/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  addTruckType: (params) => {
    const url = '/transportPrice/trucktype';
    return axiosClient.post(url, params);
  },

  deleteTruckType: (name) => {
    const url = `/transportPrice/trucktype/${name}`;
    return axiosClient.delete(url);
  },

  getAllDistance: () => {
    const url = '/transportPrice/distance';
    return axiosClient.get(url);
  },
};

export default truckAPI;
