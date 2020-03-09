//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    _title: "选择银行",
    imageFirstSrc: '/static/images/fumin/step3.png',
    bankList: [

    ],
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

    if (options.id && options.id != "") {
      this.setData({
        id: options.id
      });
    }
    this.getBankList();
  },
  getBankList: function() {
    let that = this;
    util.request(api.BankList).then(function(res) {
      if (res.errno === 0) {
        var banks = res.data.list
        that.setData({
          bankList: banks,
          total: res.data.total
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
  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    let ids = e.detail.value

    this.setData({
      bankIds: ids
    })

  },
  saveApplicant() {
    let that = this
    let bankList = this.data.bankList


    if (this.data.bankIds.length == 0) {
      util.showErrorToast('请选择银行');
      return false;
    }

    if (this.data.bankIds.length > 2) {
      util.showErrorToast('请最多选择两家银行');
      return false;
    }

    let applicant = {
      "id": this.data.id,
      "bankId": this.data.bankIds
    }
    console.log(applicant)
    util.request(api.ApplicantUpdate,
      applicant, 'POST').then(function(res) {
      if (res.errno === 0) {
        wx.navigateTo({
          url: '/pages/fumin/daikuan/daikuan'
        })
      }
    });
  }
})