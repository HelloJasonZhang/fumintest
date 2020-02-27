//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg2.png',
    selecValue: "企业"
  },
  onLoad: function () { },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  saveApplicant() {

    wx.navigateBack();

  }
})