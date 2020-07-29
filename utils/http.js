// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from './runtime';

// const Promise = require('./es6-promise.js')  // 兼容低版本微信，现在可能用不上了
export const http = (xmothod, url, json = false, data) => {
  const app = getApp();
  const token = wx.getStorageSync('token') || '';
  return new Promise(((resolve, reject) => {
    wx.request({
      url: `${app.globalData.domainUrl}${url}`,
      method: xmothod,
      data,
      header: {
        'content-type': json ? 'application/json' : 'application/x-www-form-urlencoded',
        authorization: token.authorization,
      },
      success(res) {
        if (res.statusCode !== 200) {
          reject(res);
          return;
        }
        resolve(res);
      },
      fail(res) {
        // fail调用接口失败
        reject(res);
      },
      complete() {
        // complete
      },
    });
  }));
};

export const httpKfzl = (xmothod, url, json = false, data) => {
  const token = wx.getStorageSync('token') || '';
  return new Promise(((resolve, reject) => {
    wx.request({
      url: `https://www.bbtjym.com:8100${url}`,
      method: xmothod,
      data,
      header: {
        'content-type': json ? 'application/json' : 'application/x-www-form-urlencoded',
        authorization: token.authorization,
      },
      success(res) {
        if (res.statusCode !== 200) {
          reject(res);
          return;
        }
        resolve(res);
      },
      fail(res) {
        // fail调用接口失败
        reject(res);
      },
      complete() {
        // complete
      },
    });
  }));
};
