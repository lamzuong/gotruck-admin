import axiosClient from './axiosClient';

const formFeedbackAPI = {
  getById: (param) => {
    const url = '/formfeedback/id/' + param;
    return axiosClient.get(url);
  },
  put: (params) => {
    const url = '/formfeedback';
    return axiosClient.put(url, params);
  },
  getByNoPage: (params) => {
    const url = `/formfeedback/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/formfeedback/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/formfeedback/search?page=${params.page}&limit=${params.limit}&idFeedback=${params.idFeedback}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/formfeedback/search?idFeedback=${params.idFeedback}`;
    return axiosClient.get(url);
  },

  getByNoPageHistory: (params) => {
    const url = `/formfeedback/history/pagination?status=${params.status}`;
    return axiosClient.get(url);
  },
  getByPageHistory: (params) => {
    const url = `/formfeedback/history/pagination?page=${params.page}&limit=${params.limit}&status=${params.status}`;
    return axiosClient.get(url);
  },
  searchHistory: (params) => {
    const url = `/formfeedback/history/search?page=${params.page}&limit=${params.limit}&idFeedback=${params.idFeedback}`;
    return axiosClient.get(url);
  },
  searchNoPageHistory: (params) => {
    const url = `/formfeedback/history/search?idFeedback=${params.idFeedback}`;
    return axiosClient.get(url);
  },
};
export default formFeedbackAPI;
