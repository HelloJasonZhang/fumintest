//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var WxParse = require('../../../lib/wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    _title: "政策说明",      
    imagethirdsrc: '/static/images/fumin/bg4.png',
    detail: "",
  },
  onLoad: function (options) {
    let docType = "suzhou"
    // 页面初始化 options为页面跳转所带来的参数
    if (options.docType && options.docType != "") {
      docType = options.docType
    }

    if (options.title && options.title != "") {
      wx.setNavigationBarTitle({
        title: options.title
      })
    } else {
      wx.setNavigationBarTitle({
        title: this.data._title
      })
    }
    this.showDocment(docType)
  }, 
  showDocment(docType) {
    let that = this
    util.request(api.DocumentRead, {
      docType: docType
    }, "GET").then(function (res) {
      if (res.errno === 0) {
        console.log(res.data.detail)
        that.setData({
          detail: res.data.detail
        })
        WxParse.wxParse('documentDetail', 'html', res.data.detail, that);
      } else {
        that.setData({
          show: false
        })
        util.showErrorToast("无法读取！")
      }
    })
  },  
  goBack() {
    wx.navigateBack();
  }
})