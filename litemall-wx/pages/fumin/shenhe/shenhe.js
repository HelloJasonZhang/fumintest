//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg5.png',
    scLetterIntentUrl: null
  },
  onLoad: function () {
    this.getApplicant();
  },
  getApplicant: function() {
    let that = this;
    util.request(api.ApplicantRead).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          scLetterIntentUrl: res.data.scLetterIntentUrl
        })
      }
    });
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  navigateBack() {
    wx.navigateBack();
  }
})