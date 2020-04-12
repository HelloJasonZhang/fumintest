//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg5.png',
    hsTopAmount: ''
  },
  onLoad: function (options) {
    if (options.hsTopAmount && options.hsTopAmount != "") {
      this.setData({
        hsTopAmount: options.hsTopAmount
      });
    }
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  goBack() {

    wx.navigateBack();

  }
})