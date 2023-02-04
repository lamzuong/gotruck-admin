const convertMoney = (money, suffix) => {
  return money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + (suffix ? ' ' + suffix : '');
};
export { convertMoney };
