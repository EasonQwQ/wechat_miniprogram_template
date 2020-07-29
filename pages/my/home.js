// pages/my/home.js
import { http } from '../../utils/http';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from '../../utils/runtime';
// eslint-disable-next-line no-unused-vars
import { cosConfig } from '../../config/cosConfig';
import { toast } from '../../utils/util';

Page({

  data: {
    pageIndex: 0,
    pageSize: 10,
    totalNum: 0,
    historyList: [],
  },
  onLoad() {

  },
  onShow() {
    this.getHistoryAndAllCount();
  },

  /**
   * 从后端获取历史转换记录
   */
  async getHistoryAndAllCount() {
    const { pageIndex, pageSize } = this.data;

    const res = await http('get', `/picture/picAndAllCount?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    console.log('getHistoryAndAllCount -> res.data.res', res.data.res[0][0]);
    this.setData({
      totalNum: Math.ceil(parseInt(res.data && res.data.res[0][0].total, 10) / pageSize),
      historyList: res.data && res.data.res[0],
    });
  },
  nextPage() {
    const { pageIndex } = this.data;
    this.setData({
      pageIndex: pageIndex + 1,
    });
    this.getHistoryAndAllCount();
  },
  prePage() {
    const { pageIndex } = this.data;
    this.setData({
      pageIndex: pageIndex - 1,
    });
    this.getHistoryAndAllCount();
  },
  copy(e) {
    const shortUrl = e.currentTarget.dataset.url;
    wx.setClipboardData({ data: `图片评论: ${shortUrl}` });
  },
  onPullDownRefresh() {
    this.getHistoryAndAllCount();
  },
  deleteImg(e) {
    const that = this;
    const id = parseInt(e.currentTarget.dataset.id, 10);
    const index = parseInt(e.currentTarget.dataset.index, 10);
    wx.showModal({
      content: '确认删除?',
      async success(resConfirm) {
        if (resConfirm.confirm) {
          const res = await http('DELETE', `/picture/${id}`);
          const { historyList } = that.data;
          historyList.splice(index, 1);
          that.setData({ historyList });
          toast('删除成功 ^^');
        }
      },
    });
  },
  // 预览
  preview(e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    });
  },
});
