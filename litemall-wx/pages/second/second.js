//index.js
//获取应用实例
var imageUtil = require('../../utils/image.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
var WxParse = require('../../lib/wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg1.png',
    imageFoursrc: '/static/images/fumin/bg3.png',
    items: [{
        id: 1,
        name: "小微企业",
        value: "company",
        checked: true
      },
      {
        id: 2,
        name: "个人",
        value: "personal",
        checked: false
      }
    ],
    picUrls: [],
    files: [],
    selecValue: "company",
    selectLable: "小微企业",
    detail: "",
    checked: false,
    needCreate:false,
    checkboxItems: [
      { name: 'read', value: '0' },
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数)
    if (options.needCreate && options.needCreate != "") {
      this.setData({
        needCreate: options.needCreate === 'true',
      });
    }
    //主动检查权限
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      this.checkApplicant()
    }
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //this.checkApplicant();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  checkApplicant() {
    //判断是否有申请数据
    var that = this
    util.request(api.ApplicantRead).then(function (res) {
      // if (res.errno === -1 && !that.data.needCreate) {
      //   //检查历史申请记录是否有数据
      //   util.request(api.ApplicantHistoryById).then(function (res) {
      //     if (res.errno === 0 && res.data && res.data.length > 0) {
      //       wx.navigateTo({
      //         url: '/pages/fumin/applicantHistory/applicantHistory'
      //       })
      //     }
      //   });
      // }
      if (res.data != null) {
        if (res.data.submitStatus != null && (res.data.submitStatus == 13 || res.data.isAvailable)) {
          //do nothing 重新申请
        } else {
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
        }
      }
    })
  },
  imageLoad: function(e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  radioChange(e) {
    this.data.selecValue = e.detail.value
    this.data.selectLable = e.detail.value === 'company' ? "小微企业" : "个人"
  },
  checkboxChange(e) {
    this.setData({
      checked: e.detail.value.length === 1
    });
  },
  showDocment(e) {
    let that = this
    let docId = e.currentTarget.dataset.addressId;
    let docTyp = null;
    if (docId === "policy") {
      docTyp = "政策说明"
    } else if (docId === "workflow") {
      docTyp = "流程说明"
    } else  {
      docTyp = "银行说明"
    }
    util.request(api.DocumentRead, {
      docType: docId
    }, "GET").then(function(res) {
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
  saveDanbao() {
    let that = this
    let type = this.data.selecValue;
    if (type == '') {
      util.showErrorToast('请选择类型');
      return false;
    }

    let checked = this.data.checked;
    if (!checked) {
      util.showErrorToast('请点击已阅读');
      return false;
    }


    //主动检查权限
    if (!app.globalData.hasLogin) {
      //检查账号是否已经常见申请
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      //判断是否有申请数据
      util.request(api.ApplicantRead).then(function(res) {
        if (res.data == null) {
          //去申请页面
          wx.navigateTo({
            url: '/pages/fumin/applicant/applicant?type=' + type + '&typeLable=' + that.data.selectLable
          })
        } else {
          //去申请状态页面
          if (!res.data.isAvailable) {
            wx.navigateTo({
              url: '/pages/fumin/daikuan/daikuan'
            })
          } else {
            wx.navigateTo({
              url: '/pages/fumin/applicant/applicant?type=' + type + '&typeLable=' + that.data.selectLable
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/fumin/applicant/applicant?type=' + type + '&typeLable=' + that.data.selectLable
      })
    }
  }
})