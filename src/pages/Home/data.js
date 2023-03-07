const listGoods = [];
for (let i = 0; i < 24; i++) {
  listGoods.push({ value: i + 1, label: i + 1 });
}
const listTrucks = [];
for (let i = 0; i < 24; i++) {
  listTrucks.push({ value: 'Xe ' + (i + 1) + ' tấn', label: 'Xe ' + (i + 1) + ' tấn' });
}
export { listGoods, listTrucks };
