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
export { convertMoney, parseInt, parseFloat };
