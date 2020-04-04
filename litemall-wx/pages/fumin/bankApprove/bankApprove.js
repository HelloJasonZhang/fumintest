//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg5.png',
    loanVoucherUrl: [],
    bank: null
  },
  onLoad: function (options) {
    
    if (options.id && options.id != "") {
      console.log(options.id)
      this.applicantaudit(options.id);
    }
    if (options.bankIds && options.bankIds != "") {
      this.getBank(options.bankIds)
    }
  },
  applicantaudit: function(id) {
    let that = this;
    util.request(api.Applicantaudit, { id: id }, 'Get').then(function (res) {
      console.log(res.data)
      if (res.errno === 0 && res.data.list[0].loanVoucherUrl) {
        that.setData({
          loanVoucherUrl: res.data.list[0].loanVoucherUrl
        })
      }
    });
  },
  getBank: function (bankId) {
    let that = this;
    util.request(api.BankRead,
      { id: bankId }, 'Get').then(function (res) {

        if (res.errno === 0) {
          that.setData({
            bank: res.data,
          });
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