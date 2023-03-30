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

export { convertMoney, parseInt, parseFloat, toFindDuplicates };
export { convertIndochina, convertSubstringDate };
export { typeNotify, typeSend };
