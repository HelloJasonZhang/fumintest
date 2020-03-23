//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    _title: "银行受理信息",
    imageIconSrc: '/static/images/fumin/4.png',
    bankList: [

    ],
    bankAuitList: [],
    picUrls: [],
    id: null,
    selecValue: "企业",
    total: 0,
    bankIds: [],
  },
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: this.data._title
    })
    this.getBankList();
  },
  getBankList: function() {
    let that = this;
    util.request(api.BankAuditList).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          bankAuitList: res.data,
        });
      }
    });
  },
  imageLoad: function(e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  }
});