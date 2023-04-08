import axiosClient from './axiosClient';

const policyAPI = {
  getByType: (type) => {
    const url = `/policy/byType/${type}`;
    return axiosClient.get(url);
  },
  addPolicy: (params) => {
    const url = '/policy';
    return axiosClient.post(url, params);
  },
  editPolicy: (params) => {
    const url = '/policy';
    return axiosClient.put(url, params);
  },
};

export default policyAPI;
