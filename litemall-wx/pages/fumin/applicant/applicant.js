//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var check = require('../../../utils/check.js');
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
      "applicantTypeLable": "",
      "applicantAmount": "",
      "recruitCategory": "",
      "applicantCategory": "",
      "address": "",
      "spouseIdCardNumber": "",
      "obtainInfo": "",
      "recommender": ""
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
    arrayObtianInfos: [
    ],
    indexMaritalStatus: 0,
    indexTypes: 0,
    indexHires: 0,
    indexSex: 0,
    indexObtainInfo: 0,
    isShow: false,
    type: "",
    typeLabe: "",
    id: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data._title
    })
    // 页面初始化 options为页面跳转所带来的参数)
    if (options.type && options.type != "") {
      this.setData({
        type: options.type,
      });
    }

    if (options.typeLable && options.typeLable != "") {
      this.setData({
        typeLabe: options.typeLable
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
    } else {
      this.getObtainInfos()
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
          recommender: res.data.recommender,
          indexMaritalStatus: util.filter(res.data.maritalStatus, that.data.array),
          indexSex: util.filter(res.data.sex, that.data.arraySex),
        });
        //indexTypes: util.filter(res.data.applicantCategory, that.data.arrayTyps),
        //indexHires: util.filter(res.data.recruitCategory, that.data.arrayHires)
        util.request(api.DictRead, {
          type: "获取途径"
        }, "GET").then(function (resDict) {
          console.log(res.data.obtainInfo)
          if (res.errno === 0) {
            var obtainInfos = ['请选择获取途径']
            for (var i = 0; i < resDict.data.length; i++) {
              var obtainInfo = resDict.data[i]
              obtainInfos.push(obtainInfo.name)
            }
            that.setData({
              arrayObtianInfos: obtainInfos,
              indexObtainInfo: util.filter(res.data.obtainInfo, obtainInfos),
            });

          }
        });
      }
    });
  },
  getObtainInfos: function () {
    let that = this
    util.request(api.DictRead, {
      type: "获取途径"
    }, "GET").then(function (res) {
      console.log(obtainInfo)
      if (res.errno === 0) {
        var obtainInfos = ['请选择获取途径']
        for (var i = 0; i < res.data.length; i++) {
          var obtainInfo = res.data[i]
          obtainInfos.push(obtainInfo.name)
        }
        that.setData({
          arrayObtianInfos: obtainInfos
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
    console.log(this.data.type)
    if (e.detail.value == 1 ) {
      this.setData({
        isShow: false
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
  bindPickerObtainInfoChange: function (e) {
    this.setData({
      indexObtainInfo: e.detail.value //e.detail.value
    });
  },
  bindinputRecommender: function(e) {
    this.setData({
      recommender: e.detail.value //e.detail.value
    });
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

    if (this.data.applicant.name == null || this.data.applicant.name == "") {
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

    let indexObtainInfo = this.data.indexObtainInfo
    if (this.data.indexObtainInfo == 0) {
      util.showErrorToast('请选择获取途径');
      return false;
    }
    // let indexTypes = this.data.indexTypes
    // if (this.data.indexTypes == 0) {
    //   util.showErrorToast('请选择申请人类别');
    //   return false;
    // }

    if (this.data.applicant.applicantAmount == null || this.data.applicant.applicantAmount == "" || this.data.applicant.applicantAmount == "0") {
      util.showErrorToast('请填写申请额度');
      return false;
    }

    if (!check.isValidNumber(this.data.applicant.applicantAmount)) {
      util.showErrorToast('申请额度不是正数');
      return false;
    }

    // let indexHires = this.data.indexHires
    // if (this.data.indexHires == 0) {
    //   util.showErrorToast('请选择新招/雇佣人类别');
    //   return false;
    // }

    var applicant = this.data.applicant;

    applicant.sex = this.data.arraySex[indexSex];

    applicant.maritalStatus = this.data.array[indexMaritalStatus];

    applicant.obtainInfo = this.data.arrayObtianInfos[indexObtainInfo];
    
    applicant.recommender = this.data.recommender;
    //applicant.applicantCategory = this.data.arrayTyps[indexTypes];
    //applicant.recruitCategory = this.data.arrayHires[indexHires];
    applicant.applicantType = this.data.type
    applicant.applicantTypeLable = this.data.typeLabe
    this.setData({
      applicant: applicant
    });

    wx.navigateTo({
      url: '/pages/fumin/applicantUploadAdvance/applicantUploadAdvance?applicantType=' + this.data.type + "&maritalStatus=" + this.data.applicant.maritalStatus + "&id=" + this.data.id + "&applicantAmount=" + this.data.applicant.applicantAmount
    })
  }
})