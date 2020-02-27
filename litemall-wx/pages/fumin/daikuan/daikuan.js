//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    imagethirdsrc: '/static/images/fumin/bg2.png',
    imageFoursrc: '/static/images/fumin/bg3.png',
    imageIconSrc: '/static/images/fumin/4.png',
    items: [{
      id: 1,
      cdoe: "info",
      name: "个人信息",
      submitStatus: "待完善",
      statusIcon: "info",
      statusColor: "",
      isHiddenIcon: false,
      fontColor: "gray",
      icon: "/static/images/fumin/1.png",
      sValue: 0,
      comment: ""
    }, {
      id: 2,
      cdoe: "shenshe",
      name: "人社审核信息",
      submitStatus: "待审批",
      statusIcon: "",
      statusColor: "",
      fontColor: "gray",
      isHiddenIcon: false,
      icon: "/static/images/fumin/2.png",
      sValue: 0,
      comment: ""
    }, {
      id: 3,
      cdoe: "danbao",
      name: "担保公司审核信息",
      submitStatus: "待审批",
      statusIcon: "",
      statusColor: "",
      isHiddenIcon: false,
      fontColor: "gray",
      icon: "/static/images/fumin/3.png",
      sValue: 0,
      comment: ""
    }, {
      id: 4,
      cdoe: "bank",
      name: "银行受理信息",
      submitStatus: "待审批",
      statusIcon: "",
      statusColor: "",
      isHiddenIcon: false,
      fontColor: "gray",
      icon: "/static/images/fumin/4.png",
      sValue: 0,
      comment: ""
    }],
    picUrls: [],
    files: [],
    selecValue: ""
  },
  onLoad: function() {
    this.getApplicant();
  },
  getApplicant: function() {
    let that = this;
    util.request(api.ApplicantRead, {
      id: parseInt(1)
    }).then(function(res) {
      //console.log(res.data)
      var status = res.data.submitStatus
      that.setData({
        selecValue: res.data.applicantType
      })
      if (res.errno === 0) {
        let auditAll = that.data.items
        if (status == 1) {
          auditAll[0] = util.fillAudit(auditAll[0], status)
        } else if (status == 2 || status == 3 || status == 4) {
          auditAll[0] = util.fillAudit(auditAll[0], 1)
          auditAll[1] = util.fillAudit(auditAll[1], status, res.data.hsComment)
        } else if (status == 5 || status == 6 || status == 7) {
          auditAll[0] = util.fillAudit(auditAll[0], 1)
          auditAll[1] = util.fillAudit(auditAll[1], 4, res.data.hsComment)
          auditAll[2] = util.fillAudit(auditAll[2], status, res.data.scComment)
        } else if (status == 8 || status == 9) {
          auditAll[0] = util.fillAudit(auditAll[0], 1)
          auditAll[1] = util.fillAudit(auditAll[1], 4, res.data.hsComment)
          auditAll[2] = util.fillAudit(auditAll[2], 7, res.data.scComment)
          auditAll[3] = util.fillAudit(auditAll[3], status, res.data.bComment)
        }
        that.setData({
          items: auditAll
        })
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
  goDetailChange: function(e) {
    let id = e.currentTarget.dataset.item.id;
    let sValue = e.currentTarget.dataset.item.sValue;
    let title = ""
    console.log(e)
    if (sValue == 0) {
      if(id == 1) {
        wx.navigateTo({
          url: '/pages/fumin/applicant/applicant/?type=' + this.data.selecValue
        })   
      } else {
        wx.navigateTo({
          url: '/pages/fumin/dengdai/dengdai'
        })         
      }
    } else if (sValue == 1) {
      // 0 填写  !0  查看 
      wx.navigateTo({
        url: '/pages/fumin/applicantDetail/applicantDetail'
      })  
    } else if (sValue == 2 || sValue == 5) { //等待
      if (sValue == 2) {
        title = "社核查信息"
      } else {
        title = "担保公司核查信息"
      }
      wx.navigateTo({
        url: '/pages/fumin/dengdai/dengdai?title=' + title
      })
    } else if (sValue == 3 || sValue == 6 || sValue == 8) { //拒绝
      let errorMessage = e.currentTarget.dataset.item.comment;
      if (sValue == 3) {
        title = "人社核查信息"
      } else if (sValue == 6) {
        title = "担保公司核查信息"
      } else if (sValue == 8) {
        title = "银行受理信息"
      }
      wx.navigateTo({
        url: '/pages/fumin/reject/reject?title=' + title + "&errorMessage=" + errorMessage
      })
    } else if (sValue == 4 || sValue == 7 || sValue == 9) { //通过
      //人社通过，担保通过，银行通过
      if (sValue == 4) {
        title = "人社核查信息"
      } else if (sValue == 7) {
        title = "担保公司核查信息"
      } else if (sValue == 9) {
        title = "银行受理信息"
      }
      wx.navigateTo({
        url: '/pages/fumin/shenhe/shenhe?title=' + title
      })
    }
  }
})