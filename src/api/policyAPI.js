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

  getByNoPageHistory: (params) => {
    const url = `/policy/history/pagination?type=${params.type}`;
    return axiosClient.get(url);
  },
  getByPageHistory: (params) => {
    const url = `/policy/history/pagination?page=${params.page}&limit=${params.limit}&type=${params.type}`;
    return axiosClient.get(url);
  },
};

export default policyAPI;
