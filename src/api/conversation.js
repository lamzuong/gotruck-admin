import axiosClient from './axiosClient';

const conversationAPI = {
  getConversation: (params) => {
    const url = `/conversation/admin/conversation?id_customer=${params.id_customer}&id_admin=${params.id_admin}&id_form=${params.id_form}&form_model=${params.form_model}`;
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
  putConversation: (param) => {
    const url = `/conversation/disable`;
    return axiosClient.put(url, param);
  },
};
export default conversationAPI;
