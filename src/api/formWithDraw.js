import axiosClient from './axiosClient';

const formWithDrawAPI = {
  put: (params) => {
    const url = '/formwithdraw';
    return axiosClient.put(url, params);
  },
  getByNoPage: () => {
    const url = `/formwithdraw/pagination`;
    return axiosClient.get(url);
  },
  getByPage: (params) => {
    const url = `/formwithdraw/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
  search: (params) => {
    const url = `/formwithdraw/search?page=${params.page}&limit=${params.limit}&idTransactionHistory=${params.id_transaction_history}`;
    return axiosClient.get(url);
  },
  searchNoPage: (params) => {
    const url = `/formwithdraw/search?idTransactionHistory=${params.id_transaction_history}`;
    return axiosClient.get(url);
  },

  getByNoPageHistory: () => {
    const url = `/formwithdraw/history/pagination`;
    return axiosClient.get(url);
  },
  getByPageHistory: (params) => {
    const url = `/formwithdraw/history/pagination?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },
  searchHistory: (params) => {
    const url = `/formwithdraw/history/search?page=${params.page}&limit=${params.limit}&idTransactionHistory=${params.id_transaction_history}`;
    return axiosClient.get(url);
  },
  searchNoPageHistory: (params) => {
    const url = `/formwithdraw/history/search?idTransactionHistory=${params.id_transaction_history}`;
    return axiosClient.get(url);
  },
};
export default formWithDrawAPI;
