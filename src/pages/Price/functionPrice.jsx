import { parseInt } from '~/global/functionGlobal';

const listItemCalcPrice = (
  listNative,
  checkedItem,
  action = 'Tăng',
  deltaPrice = 0,
  price1,
  price2,
) => {
  let list = [];
  for (let i = 0; i < checkedItem.length; i++) {
    let tempObj = { ...checkedItem[i] };
    action === 'Tăng'
      ? (tempObj[price1] += parseInt(deltaPrice))
      : (tempObj[price1] -= parseInt(deltaPrice));
    tempObj[price2] = listNative[i][price2];
    list.push(tempObj);
  }
  return list;
};
const listItemCalcPercent = (
  listNative,
  checkedItem,
  action = 'Tăng',
  deltaPercent = 0,
  percent1,
  percent2,
) => {
  let list = [];
  for (let i = 0; i < checkedItem.length; i++) {
    let tempObj = { ...checkedItem[i] };
    action === 'Tăng'
      ? (tempObj[percent1] = (tempObj[percent1] * (1 + deltaPercent / 100)).toFixed(0))
      : (tempObj[percent1] = (tempObj[percent1] * (1 - deltaPercent / 100)).toFixed(0));
    tempObj[percent2] = listNative[i][percent2];
    list.push(tempObj);
  }
  return list;
};
export { listItemCalcPrice, listItemCalcPercent };
