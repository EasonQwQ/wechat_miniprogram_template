import { http } from '../utils/http';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from '../utils/runtime';

export const getUser = async () => {
  const res = await http('get', 'user/');
  return res;
};
export const functionName = () => {

};
