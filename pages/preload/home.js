// pages/preload/home.js
import { http } from '../../utils/http';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from '../../utils/runtime';

Page({

  data: {

  },

  onLoad() {
    this.upData();
  },
  login() {
    wx.showLoading({ title: '登陆中' });
    wx.login({
      async success(res) {
        const data = {
          code: res.code,
        };
        const loginRes = await http('post', '/user/login', true, data);
        console.log('success -> loginRes', loginRes);
        if (loginRes) {
          console.log('success -> loginRes', loginRes);
          wx.setStorageSync('token', { authorization: `Bearer ${loginRes.data.token}` });
          wx.hideLoading();
          wx.switchTab({
            url: './../index/index',
          });
        }
      },
    });
  },
  upData() {
    const updateManager = wx.getUpdateManager();
    const that = this;
    updateManager.onCheckForUpdate((res) => {
      if (res.hasUpdate === false) {
        that.login();
      }
    });
    updateManager.onUpdateReady(() => {
      wx.showModal({
        showCancel: false,
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
  },

  onShareAppMessage() {

  },
});
