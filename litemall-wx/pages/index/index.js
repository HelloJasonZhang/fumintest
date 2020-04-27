//index.js
//获取应用实例
var imageUtil = require('../../utils/image.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var WxParse = require('../../lib/wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/index.jpg',
    detail: "",
  },
  onLoad: function () {
  },
  imageLoad: function(e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  showApplicant() {
    //主动检查权限
    if (!app.globalData.hasLogin) {
      //检查账号是否已经常见申请
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      //判断是否有申请数据
      util.request(api.ApplicantRead).then(function (res) {
        if (res.data == null) {
          //去申请页面
          wx.navigateTo({
            url: '/pages/second/second'
          })
        } else {
          //去申请状态页面
          if (!res.data.isAvailable) {
            // wx.navigateTo({
            //   url: '/pages/fumin/daikuan/daikuan'
            // })
            //去申请状态页面
            if (res.data.signatureUrl == null || res.data.signatureUrl == "") {
              wx.navigateTo({
                url: '/pages/handwriting/index/index?id=' + res.data.id
              })
            } else if (res.data.bankId == null) {
              wx.navigateTo({
                url: '/pages/fumin/bank/bank?id=' + res.data.id
              })
            } else {
              wx.navigateTo({
                url: '/pages/fumin/daikuan/daikuan'
              })
            }
          } else {
            wx.navigateTo({
              url: '/pages/second/second'
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/second/second'
      })
    }
  },
  showHistory() {
    wx.navigateTo({
      url: '/pages/fumin/applicantHistory/applicantHistory'
    })
  }, 
  showDocment(e) {
    let that = this
    let docId = e.currentTarget.dataset.addressId;
    let docTyp = null;
    if (docId === "policy") {
      docTyp = "政策说明"
    } else if (docId === "workflow") {
      docTyp = "流程说明"
    } else {
      // docTyp = "选择银行须知"
      wx.navigateTo({
        url: '/pages/fumin/bankIntroduce/bankIntroduce'
      })
      return
    }
    util.request(api.DocumentRead, {
      docType: docId
    }, "GET").then(function (res) {
      if (res.errno === 0) {
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
    //加载数据
    this.setData({
      show: true,
      docTyp: docTyp
    });
  },
  onClose() {
    this.setData({
      show: false,
      docTyp: ""
    });
  },
})