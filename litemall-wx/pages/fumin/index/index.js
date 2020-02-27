//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg1.png',
    imageFoursrc: '/static/images/fumin/bg3.png',
    items: [{
        id: 1,
        name: "企业",
        value: "企业",
        checked: true
      },
      {
        id: 2,
        name: "个人",
        value: "个人",
        checked: false
      }
    ],
    picUrls: [],
    files: [],
    selecValue: "企业"
  },
  onLoad: function() {
    //主动检查权限
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      //判断是否有申请数据
      util.request(api.ApplicantRead).then(function(res) {
        console.log(res)
        if (res.data != null) {
          if (res.data.submitStatus != null && res.data.submitStatus == 9) {
            //成功页面
            wx.navigateTo({
              url: '/pages/fumin/tongguo/tongguo'
            })
          } else {
            //去申请状态页面
            wx.navigateTo({
              url: '/pages/fumin/daikuan/daikuan'
            })
          }
        }

      })
    }
  },
  onShow: function() {

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
  },

  saveDanbao() {
    let selecValue = this.data.selecValue;
    if (selecValue == '') {
      util.showErrorToast('请选择类型');
      return false;
    }

    //主动检查权限
    console.log(app.globalData.hasLogin)
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
            url: '/pages/fumin/applicant/applicant?type=' + selecValue
          })
        } else {
          //去申请状态页面
          wx.navigateTo({
            url: '/pages/fumin/daikuan/daikuan'
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/fumin/applicant/applicant?type=' + selecValue
      })
    }
  }
})