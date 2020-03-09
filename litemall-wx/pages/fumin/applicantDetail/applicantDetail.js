var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    applicant: {
      "id": 1,
      "name": "",
      "sex": "",
      "maritalStatus": "",
      "idCardNumber": "",
      "phoneNumber": "",
      "spouseName": "",
      "applicantType": "",
      "applicantAmount": "",
      "recruitCategory": "",
      "applicantCategory": "",
      "address": "",
      "spouseIdCardNumber": "",
      "businessLicenseUrl": "",
      "salaryDetailUrl": "",
      "idCardUrl": "",
      "idCardUrl2": "",
      "spouseIdCardUrl": "",
      "spouseIdCardUrl2": "",
      "marriageCertificateUrl": "",
      "marriageCertificateUrl2": "",
      "spouseIdMarriageCertificateUrl1": "",
      "spouseIdMarriageCertificateUrl2": "",
      "residenceBookletUrl": "",
      "residenceBookletUrl2": "",
      "creditReportUrl": "",
      "creditReportUrl2": "",
      "undertakingUrl": "",
      "leaseContractUrl": "",
      "propertyCertificateUrl": "",
      "houseProprietaryCertificateUrl": "",
      "vehiclesCertificateUrl": "",
      "bankReconciliationUrl": "",
      "suretyIdCardUrl": "",
      "suretyIdCardUrl2": "",
      "extraUrl": ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getApplicant();
  },
  getApplicant: function() {
    let that = this;
    util.request(api.ApplicantRead).then(function(res) {
      that.setData({
        applicant: res.data
      })
    })
  }
})