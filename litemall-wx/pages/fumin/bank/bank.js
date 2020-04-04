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
    bankList: [],
    picUrls: [],
    id: null,
    selecValue: "企业",
    total: 0,
    bankIds: [],
    tips: "",
    needApprove: undefined,
    showPic: true,
    selectedBank: "",
    orignalBank: ""
  },
  onLoad: function(options) {
    var tipsType = '申请银行'

    wx.setNavigationBarTitle({
      title: this.data._title
    })

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
      tipsType = options.needApprove === 'false' ? '未审批更改银行' : '已审批更改银行'
      this.setData({
        needApprove: options.needApprove,
        showPic: false
      });
    }
    this.getBankList();
    this.getBankTips(tipsType);
  },
  getBankList: function() {
    let that = this;
    util.request(api.BankList).then(function(res) {
      if (res.errno === 0) {
        var banks = res.data.list
        console.log(banks)
        for(let i = 0; i < banks.length; i++) {
          let bank = banks[i]
          if (bank.id == that.data.bankIds) {
            bank['checked'] = true
            that.setData({
              orignalBank: bank.name
            })
          }
        }
        that.setData({
          bankList: banks,
          total: res.data.total
        });
      }
    });
  },
  getBankTips: function(tipsType) {
    let that = this
    util.request(api.DictRead, {
      type: tipsType
    }, "GET").then(function(res) {
      let content = "是否确定选择银行?"
      if (res.errno === 0) {
        content = res.data[0].value
      }
      that.setData({
        tips: content
      });
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
    let id = e.detail.value
    for (let i = 0; i < this.data.bankList.length; i++) {
      let bank = this.data.bankList[i]
      if (bank.id == id) {
        this.setData({
          selectedBank: bank.name
        })
      }
    }    
    this.setData({
      bankIds: [id]
    })
  },
  saveApplicant() {
    let that = this
    let bankList = this.data.bankList


    if (this.data.bankIds.length == 0) {
      util.showErrorToast('请选择银行');
      return false;
    }

    if (this.data.bankIds.length > 1) {
      util.showErrorToast('选择一家银行');
      return false;
    }

    let applicant = {
      "id": this.data.id,
      "bankId": this.data.bankIds
    }

    let title = ""
    if (this.data.orignalBank != null && this.data.orignalBank != "") {
      title = '从' + this.data.orignalBank + '更换到' + this.data.selectedBank + '?'
    } else {
      title = "选择" + this.data.selectedBank
    }

    wx.showModal({
      title: title,
      content: this.data.tips,
      success(res) {
        if (res.confirm) {
          if (that.data.needApprove === 'true') {
            util.request(api.ApplicantRedoBank,
              applicant, 'POST').then(function(res) {
              if (res.errno === 0) {
                wx.navigateTo({
                  url: '/pages/fumin/daikuan/daikuan'
                })
              }
            });
          } else {
            util.request(api.ApplicantUpdate,
              applicant, 'POST').then(function(res) {
              if (res.errno === 0) {
                wx.navigateTo({
                  url: '/pages/fumin/daikuan/daikuan'
                })
              }
            });
          }
        }
      }
    })
  }
})