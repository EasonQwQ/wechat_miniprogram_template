import { http } from '../../utils/http';
import regeneratorRuntime, { async } from '../../utils/runtime';

export const getAccessToken = async () => await http('get', '/common/accessToken');
export const getAccessToken1 = () => {};

export const mediaCheckAsync = async (accessToken) => {
  wx.request({
    url: `https://api.weixin.qq.com/wxa/media_check_async?access_token=${accessToken}`,
  })
};
