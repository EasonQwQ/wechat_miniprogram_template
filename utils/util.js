export const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

export const toast = (meg) => {
  wx.showToast({
    title: meg,
    icon: 'none',
  });
};

export const initImg = name => `${name}?time=${new Date().toISOString()}`;


/**
 * 返回 '2019-09-29' 格式的日期
 */
export const initDate = () => {
  const nowDate = new Date();
  const year = new Date(nowDate).getFullYear();
  const month = formatDateNum(new Date(nowDate).getMonth() + 1);
  const date = formatDateNum(new Date(nowDate).getDate());
  return `${year}-${month}-${date}`
};
export const initDateTime = () => {
  const nowDate = new Date();
  const year = new Date(nowDate).getFullYear();
  const month = formatDateNum(new Date(nowDate).getMonth() + 1);
  const date = formatDateNum(new Date(nowDate).getDate());
  const hour = formatDateNum(new Date(nowDate).getHours());
  const minutes = formatDateNum(new Date(nowDate).getMinutes());
  const seconds = formatDateNum(new Date(nowDate).getSeconds());
  return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
};
const formatDateNum = (num)=>{
  return num < 10 ? `0${num}` : num;
}
