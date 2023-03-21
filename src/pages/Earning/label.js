const today = [];
for (let i = 0; i < 24; i++) {
  if (i < 10) today.push('0' + i + ':00');
  else today.push(i + ':00');
}
const week = [];
for (let i = 6; i >= 0; i--) {
  let date = new Date();
  date.setDate(date.getDate() - i);
  let strDate = date.toISOString().slice(0, 10);
  let arrDate = strDate.split('-');
  week.push(arrDate[2] + '/' + arrDate[1]);
}
const month = [];
let d1 = new Date();
let d2 = new Date();
d2.setMonth(d2.getMonth() - 1);
let d3 = (d1 - d2) / 24 / 60 / 60 / 1000;
for (let i = d3; i >= 0; i--) {
  let date = new Date();
  date.setDate(date.getDate() - i);
  let strDate = date.toISOString().slice(0, 10);
  let arrDate = strDate.split('-');
  month.push(arrDate[2] + '/' + arrDate[1]);
}
export { today, week, month };
