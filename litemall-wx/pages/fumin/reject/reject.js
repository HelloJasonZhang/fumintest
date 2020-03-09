//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg6.png',
    errorMessage: "",
    id: ""
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

    if (options.id && options.id != "") {
      this.setData({
        id: options.id
      })
    }
  },
  redo() {
    //让当前状态值减一

    if (this.data.id && this.data.id != "") {
      util.request(api.ApplicantRedo, {
        id: this.data.id
      }, 'POST').then(function(res) {
        wx.navigateTo({
          url: '/pages/fumin/daikuan/daikuan'
        })
      })
    }
  }
})