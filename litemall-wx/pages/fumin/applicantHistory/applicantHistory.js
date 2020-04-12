//index.js
//获取应用实例
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    _title: "申请记录",
    historyList: [],
  },
  onLoad: function(options) {
    this.getapplicantHistoryList();
  },
  getapplicantHistoryList: function() {
    let that = this;
    util.request(api.ApplicantHistoryById).then(function(res) {
      if (res.errno === 0) {
        for(var i = 0; i < res.data.length;  i++) {
          var applicant = res.data[i]
          if (applicant.submitStatus === 13 && !applicant.isAvailable) {
            applicant['status'] = '成功'
          } else {
            applicant['status'] = '失败'
          }
        }
        that.setData({
          historyList: res.data,
        });
      }
    });
  },
  saveApplicant() {
    wx.navigateTo({
      url: '/pages/index/index?needCreate=true'
    })
  },
  showDetail(e) {
    console.log(e)
    var applicant = e.currentTarget.dataset.item;
    var content = "恭喜你" + applicant.bCredit + "万元创业担保货款额度申请成功,"
    content = content + "货款发放日" + applicant.bLoanStartDate.replace(" 00:00:00", "") + ","
    content = content + "到期日" + applicant.bLoanEndDate.replace(" 00:00:00", "") + ","
    content = content + "货款期限" + applicant.bPeriodLoan+ "个月,"
    content = content + "货款利率" + applicant.bInterestRate + "."
    content = content + "(财政贴息利率按照文件标准" + applicant.hsDiscount + "%执行)"
    wx.showModal({
      title: '告知',
      content: content,
      showCancel: false,
      confirmText: "关闭"
    });
  }
})