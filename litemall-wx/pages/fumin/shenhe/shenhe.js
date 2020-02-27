//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg5.png',
  },
  onLoad: function () {
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