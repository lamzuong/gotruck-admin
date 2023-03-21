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
export { convertMoney, parseInt, parseFloat, toFindDuplicates };
export { convertIndochina, convertSubstringDate };
