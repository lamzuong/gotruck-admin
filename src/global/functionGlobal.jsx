import { toast } from 'react-toastify';

const convertMoney = (money, suffix) => {
  return (
    Number.parseInt(money)
      .toFixed(0)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (suffix ? ' ' + suffix : '')
  );
};
const parseInt = (number) => {
  return Number.parseInt(number);
};
const parseFloat = (number) => {
  return Number.parseFloat(number);
};

const toFindDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);
function convertIndochina(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
}
function convertSubstringDate(date) {
  return date.toISOString().substring(0, 10);
}
function typeNotify(type) {
  if (type === 'Normal') return 'Bình thường';
  else if (type === 'Warning') return 'Cảnh báo';
  else if (type === 'Order') return 'Đơn hàng';
  else if (type === 'Discount') return 'Khuyến mãi';
}
function typeSend(type) {
  if (type === 'All') return 'Tất cả người dùng';
  else if (type === 'AllCustomer') return 'Tất cả khách hàng';
  else if (type === 'AllShipper') return 'Tất cả tài xế';
  else if (type === 'Specific') return 'Người dùng cụ thể';
}
function navigateToPolicy(type) {
  if (type === 'customer') return { typePolicy: 'Customer', header: 'Điều khoản cho khách hàng' };
  else if (type === 'shipper') return { typePolicy: 'Shipper', header: 'Điều khoản cho tài xế' };
  else if (type === 'security') return { typePolicy: 'Security', header: 'Chính sách bảo mật' };
  else if (type === 'regulation')
    return { typePolicy: 'Regulation', header: 'Quy chế hoạt động của GoTruck' };
}
function navigateBackPolicy(type) {
  if (type === 'Customer') return 'customer';
  else if (type === 'Shipper') return 'shipper';
  else if (type === 'Security') return 'security';
  else if (type === 'Regulation') return 'regulation';
}
function formatDatetime(date) {
  const day = new Date(date).toISOString().split('T')[0];
  const time = (new Date(date) + '').split(' ')[4];
  return day + ' ' + time;
}
const notifySuccess = (string) => {
  toast.success(string, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const notifyError = (string) => {
  toast.error(string, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export { convertMoney, parseInt, parseFloat, toFindDuplicates, formatDatetime };
export { convertIndochina, convertSubstringDate };
export { typeNotify, typeSend, navigateToPolicy, navigateBackPolicy, notifySuccess, notifyError };
