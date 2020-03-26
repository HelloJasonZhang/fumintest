//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var dataSource = require('data')
var WxParse = require('../../../lib/wxParse/wxParse.js');
var api = require('../../../config/api.js');

var app = getApp()
Page({
  data: {
    _title: "上传图片",
    imageFirstSrc: '/static/images/fumin/step2.png',
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
      "obtainInfo": "",
      "recommender": "",
      "spouseIdCardNumber": "",
      "businessLicenseUrl": "",
      "businessLicenseUrl2": "",
      "laborContractUrl": "",
      "salaryDetailUrl": "",
      "idCardUrl": "",
      "idCardUrl2": "",
      "spouseIdCardUrl": "",
      "spouseIdCard_url2": "",
      "marriageCertificateUrl": "",
      "marriageCertificateUrl2": "",
      "residenceBookletUrl": "",
      "residenceBookletUrl2": "",
      "creditReportUrl": "",
      "creditReportUrl2": "",
      "spouseCreditReportUrl": "",
      "spouseCreditReportUrl2": "",
      "undertakingUrl": "",
      "signatureUrl": "",
      "leaseContractRrl": "",
      "propertyCertificateUrl": "",
      "houseProprietaryCertificateUrl": "",
      "vehiclesCertificateUrl": "",
      "bankReconciliationUrl": "",
      "suretyIdCardUrl": "",
      "suretyIdCardUrl2": "",
      "assetUrl": "",
      "jobUrl": "",
      "jobUrl2": "",
      "mortgageUrl": "",
      "guaranteeStatementUrl": "",
      "employmentPromotionUrl": "",
      "payTaxesUrl": "",
      "extraUrl": ""
    },
    uploadFiles: [],
    tipText: "",
    hasPicture: false,
    picUrls: [],
    files: [],
    isApplicantType: false,
    isMarital: false,
    applicantType: null,
    applicantId: null,
    applicantAmount: null,
    signatureUrl: '',
    checked: false,
    checkboxItems: [
      { name: 'read', value: '0' },
    ],
  },
  onLoad: function(options) {
    console.log(options)
    // 页面初始化企业类型
    if (options.applicantType && options.applicantType != "") {
      this.setData({
        applicantType: options.applicantType
      });
    }
    // 页面初始化婚姻状态
    if (options.maritalStatus && options.maritalStatus != "") {
      this.setData({
        isMarital: options.maritalStatus
      });
    }

    if (options.applicantAmount && options.applicantAmount != "" && options.applicantAmount != "null") {
      this.setData({
        applicantAmount: options.applicantAmount
      });
    }

    if (options.id && options.id != "" && options.id != "null") {
      this.setData({
        applicantId: options.id
      });
      //回显数据
      this.getApplicant()
    } else {
      //新增页面
      //根据企业类型和婚姻状态加载数据
      //options.applicantType ='company'
      //options.maritalStatus ='未婚'
      //options.applicantAmount ='9'
      this.setData({
        uploadFiles: dataSource.getBizData(options.applicantType, options.maritalStatus, options.applicantAmount),
        tipText: dataSource.getBizTipsText(options.applicantType, options.maritalStatus, options.applicantAmount)
      });
    }
  },
  onShow: function (options) {
    //回显到电子签名
    console.log(this.data.signatureUrl)
    // if (this.data.signatureUrl != "") {
    //   let signatureUrl = this.data.signatureUrl
    //   let applicant = this.data.applicant
    //   applicant.signatureUrl = signatureUrl
    //   this.setData({
    //     signatureUrl: this.data.signatureUrl,
    //     applicant: applicant,
    //   })
      //this.data.uploadFiles[7].imageURLs[1].picUrls[0] = this.data.signatureUrl
      // let uploadFiles = this.data.uploadFiles
      // let file = this.data.uploadFiles[7]
      // let picture = file.imageURLs[1]

      // picture.picUrls[0] = this.data.signatureUrl
      // picture.hasPicture = true

      // file.imageURLs[1] = picture
      // uploadFiles[7] = file

      // this.setData({
      //   uploadFiles: uploadFiles
      // })
    //}
  },
  goSignatureUrl: function() {
    wx.navigateTo({
      url: '/pages/handwriting/index/index'
    })
  },
  checkboxChange(e) {
    this.setData({
      checked: e.detail.value.length === 1
    });
  },
  showDocment(e) {
    let that = this
    let docId = e.currentTarget.dataset.addressId;
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
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  getApplicant: function() {
    let that = this;
    util.request(api.ApplicantReadById, {
      id: that.data.applicantId
    }, 'Get').then(function(res) {
      console.log(res)
      if (res.errno === 0) {
        //回显所有图片
        let applicant = res.data
        that.setData({
          uploadFiles: dataSource.getBizData(applicant.applicantType, applicant.maritalStatus, applicant.applicantAmount)
        });
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
  chooseImage: function(e) {

    let xPosition = 0
    let yPosition = 0
    for (var i = 0; i < this.data.uploadFiles.length; i++) {
      let file = this.data.uploadFiles[i]
      for (var j = 0; j < file.imageURLs.length; j++) {
        var picture = file.imageURLs[j]
        console.log(picture.id)
        if (e.currentTarget.dataset.addressId == picture.id) {
          xPosition = picture.col
          yPosition = picture.row
        }
      }
    }
    if (this.data.uploadFiles[yPosition].imageURLs[xPosition].picUrls.length >= 1) {
      util.showErrorToast('只能上传一张图片')
      return false;
    }
    //that.data.uploadFiles[0].imageURLs[1].file
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log()
        let file = that.data.uploadFiles[yPosition]
        let picture = file.imageURLs[xPosition]
        picture.files.push(res.tempFilePaths)
        //that.data.uploadFiles[yPosition].imageURLs[xPosition].files()

        that.setData({
          uploadFiles: that.data.uploadFiles
        });
        that.upload(res, xPosition, yPosition);
      }
    })
  },
  signaturePic: function () {
      wx.navigateTo({
        url: '/pages/handwriting/index/index'
      })
  },
  upload: function(res, xPosition, yPosition) {
    var that = this;
    const uploadTask = wx.uploadFile({
      url: api.StorageUpload,
      filePath: res.tempFilePaths[0],
      name: 'file',
      success: function(res) {
        console.log(res)
        var _res = JSON.parse(res.data);
        if (_res.errno === 0) {
          var url = _res.data.url
          let uploadFiles = that.data.uploadFiles
          let file = that.data.uploadFiles[yPosition]
          let picture = file.imageURLs[xPosition]

          picture.picUrls.push(url)
          picture.hasPicture = true

          file.imageURLs[xPosition] = picture
          console.log('xPosition =' + xPosition)
          console.log(file.imageURLs[xPosition])

          uploadFiles[yPosition] = file
          console.log('yPosition =' + yPosition)
          console.log(uploadFiles[yPosition])

          console.log(uploadFiles)
          that.setData({
            uploadFiles: uploadFiles
          })
        }
      },
      fail: function(e) {
        wx.showModal({
          title: '错误',
          content: '上传失败',
          showCancel: false
        })
      },
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

  },
  previewImage: function(e) {
    let tempPicture = []
    for (var i = 0; i < this.data.uploadFiles.length; i++) {
      let file = this.data.uploadFiles[i]
      for (var j = 0; j < file.imageURLs.length; j++) {
        var picture = file.imageURLs[j]
        //console.log(picture)
        if (e.currentTarget.id == picture.id) {
          tempPicture = picture.picUrls
        }
      }
    }
    wx.previewImage({
      current: e.currentTarget.dataset.urlId, // 当前显示图片的http链接
      urls: tempPicture // 需要预览的图片http链接列表
    })
  },
  removePic: function(e) {
    for (var i = 0; i < this.data.uploadFiles.length; i++) {
      let file = this.data.uploadFiles[i]
      for (var j = 0; j < file.imageURLs.length; j++) {
        var pic = file.imageURLs[j]
        //console.log(picture)
        console.log(pic)
        if (e.currentTarget.dataset.itemId == pic.id) {
          pic.files = []
          pic.picUrls = []
          this.setData({
            uploadFiles: this.data.uploadFiles
          })
        }
      }
    }
  },
  saveUplaod() {
    // let checked = this.data.checked;
    // if (!checked) {
    //   util.showErrorToast('请点击已阅读');
    //   return false;
    // }

    // let signatureUrl = this.data.signatureUrl;
    // if (signatureUrl == null || signatureUrl == "") {
    //   util.showErrorToast('请填写电子签名');
    //   return false;     
    // }

    let pages = getCurrentPages(); // 获取页面栈
    let prevpage = pages[pages.length - 2] // 上一个页面
    let data = prevpage.data // 获取上一页data里的数据
    var iconUrls = dataSource.getBizIconUrls(this.data.applicantType, this.data.isMarital, this.data.applicantAmount)
    let iconUrlJson = {}
    for (var i = 0; i < this.data.uploadFiles.length; i++) {
      let file = this.data.uploadFiles[i]
      for (var j = 0; j < file.imageURLs.length; j++) {
        var picture = file.imageURLs[j]
        iconUrlJson[picture.id] = picture.picUrls[0]
      }
    }

    let applicant = data.applicant

    for (var i = 0; i < iconUrls.length; i++) {
      applicant[iconUrls[i]] = iconUrlJson[iconUrls[i]]
    }
    //applicant.signatureUrl = this.data.signatureUrl
    console.log(applicant)
    //更新 
    if (this.data.applicantId != null && this.data.applicantId != 0 && this.data.applicantId != "null") {
      util.request(api.ApplicantRedoUpdate,
        applicant, 'POST').then(function (res) {
          if (res.errno === 0) {
            wx.navigateTo({
              url: '/pages/handwriting/index/index?id=' + res.data.id
            })
          } else {
            util.showErrorToast('无法保存数据');
          }
        });
    } else {
      //新增
      util.request(api.ApplicantAdd,
        applicant, 'POST').then(function(res) {
        if (res.errno === 0) {
          wx.navigateTo({
            url: '/pages/handwriting/index/index?id=' + res.data.id
          })
        } else {
          util.showErrorToast('无法保存数据');
        }
      });
    }
  }
})