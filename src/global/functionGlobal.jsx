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

export { convertMoney, parseInt, parseFloat, toFindDuplicates };
