//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var app = getApp()
Page({
  data: {
    _title: "我的审批",      
    imagethirdsrc: '/static/images/fumin/bg4.png',
  },
  goBack() {
    wx.navigateBack();
  }
})