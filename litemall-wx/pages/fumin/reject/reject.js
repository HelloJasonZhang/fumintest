//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg6.png',
    errorMessage: ""
  },
  onLoad: function(options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff7754',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    if (options.errorMessage && options.errorMessage != "") {
      this.setData({
        errorMessage: options.errorMessage
      })
    }
  },
  redo() {
    wx.navigateTo({
      url: '/pages/fumin/index/index'
    })
  }
})