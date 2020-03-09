//index.js
//获取应用实例
var imageUtil = require('../../../utils/image.js');
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp()
Page({
  data: {
    _title: "上传图片",
    imageFirstSrc: '/static/images/fumin/step2.png',
    applicant: {
      "id": null,
      "name": "",
      "sex": "未婚",
      "maritalStatus": "",
      "idCardNumber": "",
      "phoneNumber": "",
      "spouseName": "",
      "applicantType": "个人",
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
    uploadFiles: [{
        id: 1,
        imageURLs: [{
          id: "businessLicenseUrl",
          name: "营业执照",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 0,
          col: 0,
          isHadden: true,
        }, {
          id: "salaryDetailUrl",
          name: "近3个月工资发放明细",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 0,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 2,
        imageURLs: [{
          id: "idCardUrl",
          name: "法人身份证正面",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 1,
          col: 0,
          isHadden: true
        }, {
          id: "idCardUrl2",
          name: "法人身份证反面",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 1,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 3,
        imageURLs: [{
          id: "spouseIdCardUrl",
          name: "配偶身份证正面",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 2,
          col: 0,
          isHadden: true
        }, {
          id: "spouseIdCardUrl2",
          name: "配偶身份证正面反面",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 2,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 4,
        imageURLs: [{
          id: "marriageCertificateUrl",
          name: "结婚证首页",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 3,
          col: 0,
          isHadden: true
        }, {
          id: "marriageCertificateUrl2",
          name: "结婚证本人页",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 3,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 5,
        imageURLs: [{
          id: "spouseIdMarriageCertificateUrl1",
          name: "离婚征首页",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 4,
          col: 0,
          isHadden: true
        }, {
          id: "spouseIdMarriageCertificateUrl2",
          name: "离婚征本人页",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 4,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 6,
        imageURLs: [{
          id: "residenceBookletUrl",
          name: "户口本首页",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 5,
          col: 0,
          isHadden: true
        }, {
          id: "residenceBookletUrl2",
          name: "户口本人页",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 5,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 7,
        imageURLs: [{
          id: "creditReportUrl",
          name: "申请人信用报告",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 6,
          col: 0,
          isHadden: true
        }, {
          id: "creditReportUrl2",
          name: "配偶信用报告",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 6,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 8,
        isShowDoc: true,
        imageURLs: [{
          id: "undertakingUrl",
          name: "承诺书",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 7,
          col: 0,
          isHadden: true,
          isShowDoc: true
        }]
      },
      {
        id: 9,
        imageURLs: [{
          id: "leaseContractUrl",
          name: "租赁合同",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 8,
          col: 0,
          isHadden: true
        }, {
          id: "propertyCertificateUrl",
          name: "产权证",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 8,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 10,
        imageURLs: [{
          id: "houseProprietaryCertificateUrl",
          name: "申请主体房产证",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 9,
          col: 0,
          isHadden: true
        }, {
          id: "vehiclesCertificateUrl",
          name: "车辆权证",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 9,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 11,
        imageURLs: [{
          id: "bankReconciliationUrl",
          name: "近一年银行对账",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 10,
          col: 0,
          isHadden: true
        }]
      },
      {
        id: 12,
        imageURLs: [{
          id: "suretyIdCardUrl",
          name: "担保人身份证正面",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 11,
          col: 0,
          isHadden: true
        }, {
          id: "suretyIdCardUrl2",
          name: "担保人身份证反面",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 11,
          col: 1,
          isHadden: true
        }, ]
      },
      {
        id: 13,
        imageURLs: [{
          id: "extraUrl",
          name: "其他补充图片",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 12,
          col: 0,
          isHadden: true,
        }, ]
      }
    ],
    hasPicture: false,
    picUrls: [],
    files: [],
    isApplicantType: false,
    isMarital: false,
    applicantType: null,
    applicantId: null
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
    // 页面初始化是否去银行页面
    if (options.id && options.id != "") {
      this.setData({
        applicantId: options.id
      });
      //回显数据
      this.getApplicant()
    }
    // console.log(111111111111111)
    // wx.setNavigationBarTitle({
    //   title: this.data._title
    // })
    // let that = this;
    // if (options.applicantType && options.applicantType != "" && options.applicantType == '个人') {
    //   that.uploadFiles[8].imageURLs[0].file.isHadden = false
    //   that.uploadFiles[8].imageURLs[1].file.isHadden = false
    //   that.uploadFiles[9].imageURLs[0].file.isHadden = false
    //   that.uploadFiles[9].imageURLs[1].file.isHadden = false
    //   that.uploadFiles[10].imageURLs[0].file.isHadden = false
    //   that.uploadFiles[10].imageURLs[1].file.isHadden = false
    //   that.uploadFiles[11].imageURLs[0].file.isHadden = false
    //   that.uploadFiles[11].imageURLs[1].file.isHadden = false
    //   this.setData({
    //     uploadFiles: that.uploadFiles
    //   });
    // }

    // if (options.maritalStatus && options.maritalStatus != "") {
    //   if (options.maritalStatus == "已婚") {
    //     that.uploadFiles[4].imageURLs[0].file.isHadden = false
    //     that.uploadFiles[4].imageURLs[1].file.isHadden = false
    //     that.uploadFiles[6].imageURLs[1].file.isHadden = false
    //   } else if (options.maritalStatus == "离异") {
    //     that.uploadFiles[3].imageURLs[0].file.isHadden = false
    //     that.uploadFiles[3].imageURLs[1].file.isHadden = false
    //   } else if ("未婚") {
    //     that.uploadFiles[3].imageURLs[0].file.isHadden = false
    //     that.uploadFiles[3].imageURLs[1].file.isHadden = false
    //     that.uploadFiles[4].imageURLs[0].file.isHadden = false
    //     that.uploadFiles[4].imageURLs[1].file.isHadden = false
    //     that.uploadFiles[6].imageURLs[1].file.isHadden = false
    //   }
    // }

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
          uploadFiles: [{
              id: 1,
              imageURLs: [{
                id: "businessLicenseUrl",
                name: "营业执照",
                hasPicture: applicant.businessLicenseUrl != null,
                picUrls: util.getArray(applicant.businessLicenseUrl),
                files: [],
                row: 0,
                col: 0,
                isHadden: true,
              }, {
                id: "salaryDetailUrl",
                name: "近3个月工资发放明细",
                hasPicture: applicant.salaryDetailUrl != null,
                picUrls: util.getArray(applicant.salaryDetailUrl),
                files: [],
                row: 0,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 2,
              imageURLs: [{
                id: "idCardUrl",
                name: "法人身份证正面",
                hasPicture: applicant.idCardUrl != null,
                picUrls: util.getArray(applicant.idCardUrl),
                files: [],
                row: 1,
                col: 0,
                isHadden: true
              }, {
                id: "idCardUrl2",
                name: "法人身份证反面",
                hasPicture: applicant.idCardUrl2 != null,
                picUrls: util.getArray(applicant.idCardUrl2),
                files: [],
                row: 1,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 3,
              imageURLs: [{
                id: "spouseIdCardUrl",
                name: "配偶身份证正面",
                hasPicture: false,
                hasPicture: applicant.spouseIdCardUrl != null,
                picUrls: util.getArray(applicant.spouseIdCardUrl),
                row: 2,
                col: 0,
                isHadden: true
              }, {
                id: "spouseIdCardUrl2",
                name: "配偶身份证正面反面",
                hasPicture: applicant.spouseIdCardUrl2 != null,
                picUrls: util.getArray(applicant.spouseIdCardUrl2),
                files: [],
                row: 2,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 4,
              imageURLs: [{
                id: "marriageCertificateUrl",
                name: "结婚证首页",
                hasPicture: applicant.marriageCertificateUrl != null,
                picUrls: util.getArray(applicant.marriageCertificateUrl),
                files: [],
                row: 3,
                col: 0,
                isHadden: true
              }, {
                id: "marriageCertificateUrl2",
                name: "结婚证本人页",
                hasPicture: false,
                hasPicture: applicant.marriageCertificateUrl2 != null,
                picUrls: util.getArray(applicant.marriageCertificateUrl2),
                row: 3,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 5,
              imageURLs: [{
                id: "spouseIdMarriageCertificateUrl1",
                name: "离婚征首页",
                hasPicture: applicant.spouseIdMarriageCertificateUrl1 != null,
                picUrls: util.getArray(applicant.spouseIdMarriageCertificateUrl1),
                files: [],
                row: 4,
                col: 0,
                isHadden: true
              }, {
                id: "spouseIdMarriageCertificateUrl2",
                name: "离婚征本人页",
                hasPicture: applicant.spouseIdMarriageCertificateUrl2 != null,
                picUrls: util.getArray(applicant.spouseIdMarriageCertificateUrl2),
                files: [],
                row: 4,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 6,
              imageURLs: [{
                id: "residenceBookletUrl",
                name: "户口本首页",
                hasPicture: applicant.residenceBookletUrl != null,
                picUrls: util.getArray(applicant.residenceBookletUrl),
                files: [],
                row: 5,
                col: 0,
                isHadden: true
              }, {
                id: "residenceBookletUrl2",
                name: "户口本人页",
                hasPicture: applicant.residenceBookletUrl2 != null,
                picUrls: util.getArray(applicant.residenceBookletUrl2),
                files: [],
                row: 5,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 7,
              imageURLs: [{
                id: "creditReportUrl",
                name: "申请人信用报告",
                hasPicture: applicant.creditReportUrl != null,
                picUrls: util.getArray(applicant.creditReportUrl),
                files: [],
                row: 6,
                col: 0,
                isHadden: true
              }, {
                id: "creditReportUrl2",
                name: "配偶信用报告",
                hasPicture: applicant.creditReportUrl2 != null,
                picUrls: util.getArray(applicant.creditReportUrl2),
                files: [],
                row: 6,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 8,
              isShowDoc: true,
              imageURLs: [{
                id: "undertakingUrl",
                name: "承诺书",
                hasPicture: applicant.undertakingUrl != null,
                picUrls: util.getArray(applicant.undertakingUrl),
                files: [],
                row: 7,
                col: 0,
                isHadden: true,
                isShowDoc: true
              }]
            },
            {
              id: 9,
              imageURLs: [{
                id: "leaseContractUrl",
                name: "租赁合同",
                hasPicture: applicant.leaseContractUrl != null,
                picUrls: util.getArray(applicant.leaseContractUrl),
                files: [],
                row: 8,
                col: 0,
                isHadden: true
              }, {
                id: "propertyCertificateUrl",
                name: "产权证",
                hasPicture: applicant.propertyCertificateUrl != null,
                picUrls: util.getArray(applicant.propertyCertificateUrl),
                files: [],
                row: 8,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 10,
              imageURLs: [{
                id: "houseProprietaryCertificateUrl",
                name: "申请主体房产证",
                hasPicture: false,
                hasPicture: applicant.houseProprietaryCertificateUrl != null,
                picUrls: util.getArray(applicant.houseProprietaryCertificateUrl),
                row: 9,
                col: 0,
                isHadden: true
              }, {
                id: "vehiclesCertificateUrl",
                name: "车辆权证",
                hasPicture: applicant.vehiclesCertificateUrl != null,
                picUrls: util.getArray(applicant.vehiclesCertificateUrl),
                files: [],
                row: 9,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 11,
              imageURLs: [{
                id: "bankReconciliationUrl",
                name: "近一年银行对账",
                hasPicture: applicant.bankReconciliationUrl != null,
                picUrls: util.getArray(applicant.bankReconciliationUrl),
                files: [],
                row: 10,
                col: 0,
                isHadden: true
              }]
            },
            {
              id: 12,
              imageURLs: [{
                id: "suretyIdCardUrl",
                name: "担保人身份证正面",
                hasPicture: applicant.suretyIdCardUrl != null,
                picUrls: util.getArray(applicant.suretyIdCardUrl),
                files: [],
                row: 11,
                col: 0,
                isHadden: true
              }, {
                id: "suretyIdCardUrl2",
                name: "担保人身份证反面",
                hasPicture: applicant.suretyIdCardUrl2 != null,
                picUrls: util.getArray(applicant.suretyIdCardUrl2),
                files: [],
                row: 11,
                col: 1,
                isHadden: true
              }, ]
            },
            {
              id: 13,
              imageURLs: [{
                id: "extraUrl",
                name: "其他图片",
                hasPicture: applicant.extraUrl != null,
                picUrls: util.getArray(applicant.extraUrl),
                files: [],
                row: 12,
                col: 0,
                isHadden: true,
              }, ]
            }
          ]
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
    console.log("==========1111111111======== =" + xPosition)
    console.log("xPosition =" + xPosition)
    console.log("yPosition =" + yPosition)
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
        console.log("================== =" + xPosition)
        console.log("xPosition =" + xPosition)
        console.log("yPosition =" + yPosition)
        that.upload(res, xPosition, yPosition);
      }
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
    let pages = getCurrentPages(); // 获取页面栈
    let prevpage = pages[pages.length - 2] // 上一个页面
    let data = prevpage.data // 获取上一页data里的数据
    var iconUrls = [
      "businessLicenseUrl",
      "salaryDetailUrl",
      "idCardUrl",
      "idCardUrl2",
      "spouseIdCardUrl",
      "spouseIdCardUrl2",
      "marriageCertificateUrl",
      "marriageCertificateUrl2",
      "spouseIdMarriageCertificateUrl1",
      "spouseIdMarriageCertificateUrl2",
      "residenceBookletUrl",
      "residenceBookletUrl2",
      "creditReportUrl",
      "creditReportUrl2",
      "undertakingUrl",
      "leaseContractUrl",
      "propertyCertificateUrl",
      "houseProprietaryCertificateUrl",
      "vehiclesCertificateUrl",
      "bankReconciliationUrl",
      "suretyIdCardUrl",
      "suretyIdCardUrl2",
      "extraUrl"
    ]
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
    console.log(applicant)
    console.log(this.data.applicantId)
    //更新 
    if (this.data.applicantId != null && this.data.applicantId != 0 && this.data.applicantId != "null") {
      util.request(api.ApplicantRedoUpdate,
        applicant, 'POST').then(function (res) {
          if (res.errno === 0) {
            wx.navigateTo({
              url: '/pages/fumin/daikuan/daikuan'
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
            url: '/pages/fumin/bank/bank?id=' + res.data.id
          })
        } else {
          util.showErrorToast('无法保存数据');
        }
      });
    }
  }
})