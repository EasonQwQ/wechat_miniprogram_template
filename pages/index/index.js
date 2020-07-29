import { http } from '../../utils/http';
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from '../../utils/runtime';
import { cosConfig } from '../../config/cosConfig';
import { toast } from '../../utils/util';

const COS = require('../../lib/cos-wx-sdk-v5.js');

const cos = new COS({
  SecretId: cosConfig.SecretId,
  SecretKey: cosConfig.SecretKey,
});

Page({
  data: {
    images: [],
    showShortUrl: false,
    shortUrl: '',
    accessToken: null,
  },
  onShow() {
  },

  onLoad() {
    this.getUserInfo();
    this.getService();
  },
  async getUserInfo() {
    const res = await http('get', '/user/');
    if (res.data.userInfo) {
      wx.setStorageSync('userInfo', res.data.userInfo);
    }
  },
  async getService() {
    cos.getService((err, data) => {
      console.log(data && data.Buckets);
    });
  },
  /**
   * 将图片转化成this.data.images中的数据
   */
  uploadImg() {
    const that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认用原图
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有 , 'camera'
      success(res) {
        let {
          images,
        } = that.data;
        res.tempFiles.forEach((v) => {
          const index = v.path.lastIndexOf('.');
          const suffix = v.path.substr(index + 1);
          const name = (`${Math.random(1)}`).split('.')[1];
          if (v.size > 2048000) {
            toast('表情包最多2M ^^');
            return;
          }
          images.unshift({
            fileName: `${name}.${suffix}`,
            filePath: v.path,
          });
        });
        images = images.length <= 1 ? images : images.splice(0, 1);
        that.setData({
          images,
        });
      },
    });
  },

  convertToShortURL() {
    const that = this;
    const uid = wx.getStorageSync('userInfo').id;
    const { images } = this.data;
    if (images.length === 0) {
      toast('请选择图片');
      return false;
    }
    wx.showLoading({
      title: '转换中',
    });
    const curDate = new Date().valueOf();
    images.map(async (v) => {
      cos.postObject({
        Bucket: 'comment-pic-1255632723',
        Region: 'ap-shanghai',
        Key: `userImg/${uid}/${curDate}${v.fileName}`,
        FilePath: v.filePath,
        /* 必须 */
      }, async (err, data) => {
        if (err) {
          toast('网络错误');
        }
        const picData = {
          longurl: data.Location,
        };
        // const res = Service.mediaCheckAsync(that.data.accessToken);
        // console.log('longurl', data.Location);
        try {
          const picRes = await http('post', '/picture/', true, picData);
          console.log('convertToShortURL -> picRes', picRes);
          if (picRes) {
            wx.hideLoading();
            that.setData({
              showShortUrl: true,
              shortUrl: picRes.data.res.shorturl,
            });
          }
        } catch (error) {
          wx.hideLoading();
          console.log('errr', error);
          toast('服务器错误,请联系管理员');
        }
      });
    });
  },

  /**
   * 一键复制
   */
  copy() {
    const { shortUrl } = this.data;
    wx.setClipboardData({
      data: `图片评论: ${shortUrl}`,
      success() {
        wx.getClipboardData({

        });
      },
    });
  },
  预览() {

  },
  changeImg() {
    this.setData({
      images: [],
      showShortUrl: false,
    });
    this.uploadImg();
  },
  onShareAppMessage() {
    return {
      title: '带图评论',
      path: '/pages/preload/home',
      imageUrl: '/images/head.png',
    };
  },
});
