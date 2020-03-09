//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({
  data: {
    _title: "填写资料",
    applicant: {
      "id": null,
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
    },
    imageFirstSrc: '/static/images/fumin/step1.png',
    array: ['请选择婚姻状态', '已婚', '离异', '未婚'],
    arraySex: ['请选择性别', '男', '女'],
    arrayTyps: [
      '请选择申请人类别',
      '城镇登记失业人员 ',
      '复员转业退役军人',
      '刑满释放人员',
      '高校毕业生',
      '化解过剩产能企业职工和失业职工',
      '返乡创业农民工',
      '网络商户',
      '建档立卡贫困人口',
      '农村自主创业农民',
      '其他'
    ],
    arrayHires: [
      '请选择新招/雇佣人类别',
      '城镇登记失业人员 ',
      '复员转业退役军人',
      '刑满释放人员',
      '高校毕业生',
      '化解过剩产能企业职工和失业职工',
      '返乡创业农民工',
      '网络商户',
      '建档立卡贫困人口',
      '农村自主创业农民',
      '其他'
    ],
    indexMaritalStatus: 0,
    indexTypes: 0,
    indexHires: 0,
    indexSex: 0,
    isShow: false,
    selecValue: "企业",
    type: "",
    id: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data._title
    })
    // 页面初始化 options为页面跳转所带来的参数
    if (options.type && options.type != "") {
      this.setData({
        type: options.type
      });
    }
    //数据回填
    // 页面初始化 options为页面跳转所带来的参数
    if (options.id && options.id != "") {
      this.setData({
        id: options.id
      });
      //回显数据
      this.getApplicant()
    }
  },
  getApplicant: function () {
    let that = this;
    util.request(api.ApplicantReadById,
    {id: this.data.id}, 'Get').then(function (res) {
      if (res.errno === 0) {
        //回显性别
        //回显婚姻状态
        //回显申请人类别
        //回显新招/雇佣人类别  
        that.setData({
          applicant: res.data,
          indexMaritalStatus: util.filter(res.data.maritalStatus, that.data.array),
          indexSex: util.filter(res.data.sex, that.data.arraySex),
          indexTypes: util.filter(res.data.applicantCategory, that.data.arrayTyps),
          indexHires: util.filter(res.data.recruitCategory, that.data.arrayHires)
        });
      }
    });
  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },
  radioChange(e) {
    this.data.selecValue = e.detail.value
  },
  bindPickerSex: function (e) {
    this.setData({
      indexSex: e.detail.value //e.detail.value
    });
    // let applicant = this.data.applicant;
    // applicant.sex = this.data.arraySex[e.detail.value];
    // this.setData({
    //   applicant: applicant
    // });
  },
  bindPickerChange: function (e) { //配偶
    this.setData({
      indexMaritalStatus: e.detail.value
    });
    //隐藏配偶
    if (e.detail.value == 1) {
      this.setData({
        isShow: true
      });
    } else {
      this.setData({
        isShow: false
      });
    }
  },
  bindPickerTypesChange: function (e) {
    this.setData({
      indexTypes: e.detail.value
    });
    // let applicant = this.data.applicant;
    // applicant.applicantAmount = this.data.arrayTyps[e.detail.value];
    // this.setData({
    //   applicant: applicant
    // });
  },
  bindPickerHireChange: function (e) {
    this.setData({
      indexHires: e.detail.value
    });
    // let applicant = this.data.applicant;
    // applicant.recruitCategory = this.data.arrayHires[e.detail.value];
    // this.setData({
    //   applicant: applicant
    // });
  },
  bindinputIdCardNumber: function (e) {
    let applicant = this.data.applicant;
    applicant.idCardNumber = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  bindinputPhoneNumbere: function (e) {
    let applicant = this.data.applicant;
    applicant.phoneNumber = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  bindinputSpouseName: function (e) {
    let applicant = this.data.applicant;
    applicant.spouseName = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  bindinputSpouseIdCardNumber: function (e) {
    let applicant = this.data.applicant;
    applicant.spouseIdCardNumber = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  bindinputAddress: function (e) {
    let applicant = this.data.applicant;
    applicant.address = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  bindinputName: function (e) {
    let applicant = this.data.applicant;
    applicant.name = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  bindinputApplicantAmount: function (e) {
    let applicant = this.data.applicant;
    applicant.applicantAmount = e.detail.value;
    this.setData({
      applicant: applicant
    });
  },
  saveApplicant() {
    let name = this.data.name
    console.log(name)
    if (this.data.applicant.name == null && this.data.applicant.name != "") {
      util.showErrorToast('请填写姓名');
      return false;
    }

    let indexSex = this.data.indexSex
    if (this.data.indexSex == 0) {
      util.showErrorToast('请选择性别');
      return false;
    }
    let indexMaritalStatus = this.data.indexMaritalStatus
    if (this.data.indexMaritalStatus == 0) {
      util.showErrorToast('请选择婚姻状态');
      return false;
    }

    let indexTypes = this.data.indexTypes
    if (this.data.indexTypes == 0) {
      util.showErrorToast('请选择申请人类别');
      return false;
    }


    let indexHires = this.data.indexHires
    if (this.data.indexHires == 0) {
      util.showErrorToast('请选择新招/雇佣人类别');
      return false;
    }

    var applicant = this.data.applicant;

    applicant.sex = this.data.arraySex[indexSex];

    applicant.maritalStatus = this.data.array[indexMaritalStatus];

    applicant.applicantCategory = this.data.arrayTyps[indexTypes];

    applicant.recruitCategory = this.data.arrayHires[indexHires];

    applicant.applicantType = this.data.selecValue

    this.setData({
      applicant: applicant
    });

    wx.navigateTo({
      url: '/pages/fumin/applicantUpload/applicantUpload?applicantType=' + this.data.type + "&maritalStatus=" + this.data.applicant.maritalStatus + "&id=" + this.data.id
    })
  }
})