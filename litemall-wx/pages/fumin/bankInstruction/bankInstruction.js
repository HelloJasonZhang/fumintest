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
    btnTimer: "倒计时",
    id: "",
    bankIds: [],
    needApprove: undefined,
  },
  onLoad: function (options) {
    let docType = "bank_desc"
 
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id && options.id != "") {
      this.setData({
        id: options.id
      });
    }

    if (options.bankIds && options.bankIds != "") {
      this.setData({
        bankIds: options.bankIds
      });
    }

    if (options.needApprove && options.needApprove != "") {
      this.setData({
        needApprove: options.needApprove,
      });
    }
    this.showDocment(docType)
  }, 
  showDocment(docType) {
    let that = this
    util.request(api.DocumentRead, {
      docType: docType
    }, "GET").then(function (res) {
      if (res.errno === 0) {
        that.setData({
          detail: res.data.detail
        })
        WxParse.wxParse('documentDetail', 'html', res.data.detail, that);
        that.getVerificationCode()
      } else {
        that.setData({
          show: false
        })
        util.showErrorToast("无法读取！")
      }
    })
  },  
  goBack() {
    if (this.data.btnTimer === '下一步') {
      wx.navigateTo({
        url: '/pages/fumin/bank/bank?id=' + this.data.id + '&needApprove=' + this.data.needApprove + '&bankIds=' + this.data.bankIds
      })
    }
  },
  getVerificationCode() {
    var that = this
    var num = 10;
    that.setData({
      btnTimer: num + "s"
    })
    var timer = setInterval(function () {
      num--;
      if (num <= 0) {
        clearInterval(timer);
        that.setData({
          btnTimer: '下一步',
          disabled: false
        })
      } else {
        that.setData({
          btnTimer: num + "s",
          disabled: true
        })
      }
    }, 1000)
  }
})