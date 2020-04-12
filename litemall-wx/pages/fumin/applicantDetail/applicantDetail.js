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
    },
    imageUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApplicant();
  },
  getApplicant: function () {
    let that = this;
    var data = [
      { name: "营业执照正面", url: "businessLicenseUrl", isShow: true },
      { name: "营业执照反面", url: "business_license_url_2", isShow: true },
      { name: "手持营业执照正面", url: "handBusinessLicenseUrl", isShow: true },
      { name: "劳动合同", url: "laborContractUrl", isShow: true },
      { name: "工资明细", url: "salaryDetailUrl", isShow: true },
      { name: "身份证正面", url: "idCardUrl", isShow: true },
      { name: "身份证反面", url: "idCardUrl2", isShow: true },
      { name: "手持身份证正面", url: "handIdCardUrl", isShow: true },
      { name: "配偶身份证正面", url: "spouseIdCardUrl", isShow: true },
      { name: "配偶身份证反面", url: "spouseIdCard_url2", isShow: true },
      { name: "婚姻证首页", url: "marriageCertificateUrl", isShow: true },
      { name: "婚姻证本人页", url: "marriageCertificateUrl2", isShow: true },
      { name: "户口本首页", url: "residenceBookletUrl", isShow: true },
      { name: "户口本本人页", url: "residenceBookletUrl2", isShow: true },
      { name: "法定代表人信用报告", url: "creditReportUrl", isShow: true },
      { name: "配偶代表人信用报告", url: "spouseCreditReportUrl", isShow: true },
      { name: "承诺书", url: "undertakingUrl", isShow: true },
      { name: "电子签名", url: "signatureUrl", isShow: true },
      { name: "租赁合同", url: "leaseContractRrl", isShow: true },
      { name: "产权证", url: "propertyCertificateUrl", isShow: true },
      { name: "房产证", url: "houseProprietaryCertificateUrl", isShow: true },
      { name: "车辆权证", url: "vehiclesCertificateUrl", isShow: true },
      { name: "银行对账", url: "bankReconciliationUrl", isShow: true },
      { name: "担保人身份证正面", url: "suretyIdCardUrl", isShow: true },
      { name: "担保人身份证反面", url: "suretyIdCardUrl2", isShow: true },
      { name: "个人资产证明", url: "assetUrl", isShow: true },
      { name: "就业创业证1", url: "jobUrl", isShow: true },
      { name: "就业创业证2", url: "jobUrl2", isShow: true },
      { name: "抵押信息", url: "mortgageUrl", isShow: true },
      { name: "共同担保声明", url: "guaranteeStatementUrl", isShow: true },
      { name: "带动就业人员信息", url: "employmentPromotionUrl", isShow: true },
      { name: "当年纳税申报及上年纳税收据", url: "payTaxesUrl", isShow: true },
      { name: "其他照片", url: "extraUrl", isShow: true }
    ]
    util.request(api.ApplicantRead).then(function (res) {
      for(var i = 0; i < data.length; i++) {
        var keyUrl = data[i].url
        if (res.data[keyUrl] == null || res.data[keyUrl] == "") { 
          data[i].isShow = false
        } else {
          data[i]['imgUrl'] = res.data[keyUrl]
        }
      }
      that.setData({
        applicant: res.data,
        imageUrls: data
      })
    })
  }
})