import axiosClient from './axiosClient';

const conversationAPI = {
  getConversation: (params) => {
    const url = `/conversation/admin/conversation?id_cus=${params.id_cus}&id_admin=${params.id_admin}`;
    return axiosClient.get(url);
  },
  getMessage: (params) => {
    const url = `/conversation/message/${params}`;
    return axiosClient.get(url);
  },
  postMessage: (param) => {
    const url = `/conversation/message`;
    return axiosClient.post(url, param);
  },
};
export default conversationAPI;
