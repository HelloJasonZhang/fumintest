var util = require('../../../utils/util.js');

function showBizData(applicant) {
  console.log(applicant.applicantType)
  console.log(applicant.maritalStatus)
  console.log(applicant.applicantAmount)
  let data = []
  if (applicant.applicantType === '个人') {
    if (applicant.maritalStatus === '已婚') {
      if (parseInt(applicant.applicantAmount) > 10) {
        data = showPersonalAndIsMarriedAndExceedData(applicant)
      } else {
        data = showPersonalAndIsMarriedAndLessData(applicant)
      }
    } else if (applicant.maritalStatus === '离异') {
      if (parseInt(applicant.applicantAmount) > 10) {
        data = showPersonalAndDivorceAndExceedData(applicant)
      } else {
        data = showPersonalAndDivorceAndLessData(applicant)
      }
    } else {
      if (parseInt(applicant.applicantAmount) > 10) {
        data = showPersonalAndNoMarriedAndExceedData(applicant)
      } else {
        data = showPersonalAndNoMarriedAndLessData(applicant)
      }
    }
  } else {
    if (applicant.maritalStatus === '已婚') {
      data = showCpyDataAndIsMarriedData(applicant)
    } else {
      data = showCpyDataAndNoMarriedData(applicant)
    }
  }
  console.log(data)
  return data
}

function showPersonalAndIsMarriedAndExceedData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        hasPicture: applicant.spouseIdCardUrl != null,
        picUrls: util.getArray(applicant.spouseIdCardUrl),
        files: [],
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
        hasPicture: applicant.marriageCertificateUrl2 != null,
        picUrls: util.getArray(applicant.marriageCertificateUrl2),
        files: [],
        row: 3,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 4,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 6,
      imageURLs: [{
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl2",
        name: "配偶信用报告",
        hasPicture: applicant.creditReportUrl2 != null,
        picUrls: util.getArray(applicant.creditReportUrl2),
        files: [],
        row: 5,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 7,
      imageURLs: [{
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: applicant.leaseContractUrl != null,
        picUrls: util.getArray(applicant.leaseContractUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: applicant.propertyCertificateUrl != null,
        picUrls: util.getArray(applicant.propertyCertificateUrl),
        files: [],
        row: 6,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 8,
      imageURLs: [{
          id: "mortgageUrl",
          name: "抵押信息",
          hasPicture: applicant.mortgageUrl != null,
          picUrls: util.getArray(applicant.mortgageUrl),
          files: [],
          row: 7,
          col: 0,
          isHadden: true
        },
        {
          id: "guaranteeStatement",
          name: "共同担保声明",
          hasPicture: applicant.guaranteeStatement != null,
          picUrls: util.getArray(applicant.guaranteeStatement),
          files: [],
          row: 7,
          col: 1,
          isHadden: true
        }
      ]
    },
    {
      id: 9,
      imageURLs: [{
        id: "suretyIdCardUrl",
        name: "担保人身份证正面",
        hasPicture: applicant.suretyIdCardUrl != null,
        picUrls: util.getArray(applicant.suretyIdCardUrl),
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "suretyIdCardUrl2",
        name: "担保人身份证反面",
        hasPicture: applicant.suretyIdCardUrl2 != null,
        picUrls: util.getArray(applicant.suretyIdCardUrl2),
        files: [],
        row: 8,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 10,
      imageURLs: [{
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: applicant.jobUrl != null,
        picUrls: util.getArray(applicant.jobUrl),
        files: [],
        row: 9,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
        hasPicture: applicant.jobUrl2 != null,
        picUrls: util.getArray(applicant.jobUrl2),
        files: [],
        row: 9,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 11,
      imageURLs: [{
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: applicant.assetUrl != null,
        picUrls: util.getArray(applicant.assetUrl),
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    },
    {
      id: 12,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 11,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function showPersonalAndDivorceAndExceedData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        id: "spouseIdMarriageCertificateUrl1",
        name: "离婚征首页",
        hasPicture: applicant.spouseIdMarriageCertificateUrl1 != null,
        picUrls: util.getArray(applicant.spouseIdMarriageCertificateUrl1),
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "spouseIdMarriageCertificateUrl2",
        name: "离婚征本人页",
        hasPicture: applicant.spouseIdMarriageCertificateUrl2 != null,
        picUrls: util.getArray(applicant.spouseIdMarriageCertificateUrl2),
        files: [],
        row: 2,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 4,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 3,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 3,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }]
    },
    {
      id: 6,
      imageURLs: [{
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: applicant.leaseContractUrl != null,
        picUrls: util.getArray(applicant.leaseContractUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: applicant.propertyCertificateUrl != null,
        picUrls: util.getArray(applicant.propertyCertificateUrl),
        files: [],
        row: 5,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 7,
      imageURLs: [{
        id: "mortgageUrl",
        name: "抵押信息",
        hasPicture: applicant.mortgageUrl != null,
        picUrls: util.getArray(applicant.mortgageUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }]
    },
    {
      id: 8,
      imageURLs: [{
        id: "suretyIdCardUrl",
        name: "担保人身份证正面",
        hasPicture: applicant.suretyIdCardUrl != null,
        picUrls: util.getArray(applicant.suretyIdCardUrl),
        files: [],
        row: 7,
        col: 0,
        isHadden: true
      }, {
        id: "suretyIdCardUrl2",
        name: "担保人身份证反面",
        hasPicture: applicant.suretyIdCardUrl2 != null,
        picUrls: util.getArray(applicant.suretyIdCardUrl2),
        files: [],
        row: 7,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 9,
      imageURLs: [{
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: applicant.jobUrl != null,
        picUrls: util.getArray(applicant.jobUrl),
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
        hasPicture: applicant.jobUrl2 != null,
        picUrls: util.getArray(applicant.jobUrl2),
        files: [],
        row: 8,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 10,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 9,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}


function showPrsonalAndIsMarriedAndLessData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        hasPicture: applicant.spouseIdCardUrl != null,
        picUrls: util.getArray(applicant.spouseIdCardUrl),
        files: [],
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
        hasPicture: applicant.marriageCertificateUrl2 != null,
        picUrls: util.getArray(applicant.marriageCertificateUrl2),
        files: [],
        row: 3,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 4,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 6,
      imageURLs: [{
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl2",
        name: "配偶信用报告",
        hasPicture: applicant.creditReportUrl2 != null,
        picUrls: util.getArray(applicant.creditReportUrl2),
        files: [],
        row: 5,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 7,
      imageURLs: [{
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: applicant.leaseContractUrl != null,
        picUrls: util.getArray(applicant.leaseContractUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: applicant.propertyCertificateUrl != null,
        picUrls: util.getArray(applicant.propertyCertificateUrl),
        files: [],
        row: 6,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 8,
      imageURLs: [{
        id: "mortgageUrl",
        name: "抵押信息",
        hasPicture: applicant.mortgageUrl != null,
        picUrls: util.getArray(applicant.mortgageUrl),
        files: [],
        row: 7,
        col: 0,
        isHadden: true
      }, {
        id: "aasetUrl",
        name: "资产证明",
        hasPicture: applicant.aasetUrl != null,
        picUrls: util.getArray(applicant.aasetUrl),
        files: [],
        row: 7,
        col: 1,
        isHadden: true
      }]
    },
    {
      id: 9,
      imageURLs: [{
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: applicant.jobUrl != null,
        picUrls: util.getArray(applicant.jobUrl),
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
        hasPicture: applicant.jobUrl2 != null,
        picUrls: util.getArray(applicant.jobUrl2),
        files: [],
        row: 8,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 10,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 9,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}


function showPersonalAndDivorceAndLessData() {
  return [{
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
        name: "工资单",
        id: "salaryDetailUrl",
        hasPicture: applicant.businessLicenseUrl != null,
        id: "salaryDetailUrl",
        picUrls: util.getArray(applicant.businessLicenseUrl),
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
        name: "身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        id: "spouseIdMarriageCertificateUrl1",
        name: "离婚征首页",
        hasPicture: applicant.spouseIdMarriageCertificateUrl1 != null,
        picUrls: util.getArray(applicant.spouseIdMarriageCertificateUrl1),
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "spouseIdMarriageCertificateUrl2",
        name: "离婚征本人页",
        hasPicture: applicant.spouseIdMarriageCertificateUrl2 != null,
        picUrls: util.getArray(applicant.spouseIdMarriageCertificateUrl2),
        files: [],
        row: 2,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 4,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 3,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 3,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: applicant.assetUrl != null,
        picUrls: util.getArray(applicant.assetUrl),
        files: [],
        row: 4,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 6,
      imageURLs: [{
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: applicant.leaseContractUrl != null,
        picUrls: util.getArray(applicant.leaseContractUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: applicant.propertyCertificateUrl != null,
        picUrls: util.getArray(applicant.propertyCertificateUrl),
        files: [],
        row: 5,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 7,
      imageURLs: [{
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: applicant.jobUrl != null,
        picUrls: util.getArray(applicant.jobUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
        hasPicture: applicant.jobUrl2 != null,
        picUrls: util.getArray(applicant.jobUrl2),
        files: [],
        row: 6,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 8,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 7,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function showCpyDataAndIsMarriedData() {
  return [{
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
        },
        {
          id: "employmentPromotionUrl",
          name: "带动就业人员信息",
          hasPicture: applicant.employmentPromotionUrl != null,
          picUrls: util.getArray(applicant.employmentPromotionUrl),
          files: [],
          row: 0,
          col: 1,
          isHadden: true,
        }
      ]
    }, {
      id: 2,
      imageURLs: [{
        id: "idCardUrl",
        name: "法人代表身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "法人代表身份证反面",
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
        hasPicture: applicant.spouseIdCardUrl != null,
        picUrls: util.getArray(applicant.spouseIdCardUrl),
        files: [],
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
        hasPicture: applicant.marriageCertificateUrl2 != null,
        picUrls: util.getArray(applicant.marriageCertificateUrl2),
        files: [],
        row: 3,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 4,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 6,
      imageURLs: [{
        id: "payTaxesUrl",
        name: "纳税收据",
        hasPicture: applicant.payTaxesUrl != null,
        picUrls: util.getArray(applicant.payTaxesUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl",
        name: "法人征信查询记录",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 5,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 7,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function showCpyDataAndNoMarriedData() {
  return [{
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
      }]
    }, {
      id: 2,
      imageURLs: [{
        id: "idCardUrl",
        name: "法人代表身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "法人代表身份证反面",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 2,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 4,
      imageURLs: [{
        id: "payTaxesUrl",
        name: "纳税收据",
        hasPicture: applicant.payTaxesUrl != null,
        picUrls: util.getArray(applicant.payTaxesUrl),
        files: [],
        row: 3,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl",
        name: "法人征信查询记录",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 3,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function getIconUrls() {
  return [
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
    "signatureUrl",
    "leaseContractUrl",
    "propertyCertificateUrl",
    "houseProprietaryCertificateUrl",
    "vehiclesCertificateUrl",
    "bankReconciliationUrl",
    "suretyIdCardUrl",
    "suretyIdCardUrl2",
    "extraUrl"
  ]
}

function showPersonalAndNoMarriedAndExceedData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
        hasPicture: applicant.idCardUrl2 != null,
        picUrls: util.getArray(applicant.idCardUrl2),
        files: [],
        row: 1,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 4,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 6,
      imageURLs: [{
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }]
    },
    {
      id: 7,
      imageURLs: [{
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: applicant.leaseContractUrl != null,
        picUrls: util.getArray(applicant.leaseContractUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: applicant.propertyCertificateUrl != null,
        picUrls: util.getArray(applicant.propertyCertificateUrl),
        files: [],
        row: 6,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 8,
      imageURLs: [{
        id: "mortgageUrl",
        name: "抵押信息",
        hasPicture: applicant.mortgageUrl != null,
        picUrls: util.getArray(applicant.mortgageUrl),
        files: [],
        row: 7,
        col: 0,
        isHadden: true
      }]
    },
    {
      id: 9,
      imageURLs: [{
        id: "suretyIdCardUrl",
        name: "担保人身份证正面",
        hasPicture: applicant.suretyIdCardUrl != null,
        picUrls: util.getArray(applicant.suretyIdCardUrl),
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "suretyIdCardUrl2",
        name: "担保人身份证反面",
        hasPicture: applicant.suretyIdCardUrl2 != null,
        picUrls: util.getArray(applicant.suretyIdCardUrl2),
        files: [],
        row: 8,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 10,
      imageURLs: [{
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: applicant.jobUrl != null,
        picUrls: util.getArray(applicant.jobUrl),
        files: [],
        row: 9,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
        hasPicture: applicant.jobUrl2 != null,
        picUrls: util.getArray(applicant.jobUrl2),
        files: [],
        row: 9,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 11,
      imageURLs: [{
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: applicant.assetUrl != null,
        picUrls: util.getArray(applicant.assetUrl),
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    },
    {
      id: 12,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function showPersonalAndNoMarriedAndLessData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: applicant.idCardUrl != null,
        picUrls: util.getArray(applicant.idCardUrl),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
        hasPicture: applicant.idCardUrl2 != null,
        picUrls: util.getArray(applicant.idCardUrl2),
        files: [],
        row: 1,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 5,
      imageURLs: [{
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: applicant.residenceBookletUrl != null,
        picUrls: util.getArray(applicant.residenceBookletUrl),
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
        hasPicture: applicant.residenceBookletUrl2 != null,
        picUrls: util.getArray(applicant.residenceBookletUrl2),
        files: [],
        row: 4,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 6,
      imageURLs: [{
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: applicant.creditReportUrl != null,
        picUrls: util.getArray(applicant.creditReportUrl),
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }]
    },
    {
      id: 7,
      imageURLs: [{
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: applicant.leaseContractUrl != null,
        picUrls: util.getArray(applicant.leaseContractUrl),
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: applicant.propertyCertificateUrl != null,
        picUrls: util.getArray(applicant.propertyCertificateUrl),
        files: [],
        row: 6,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 10,
      imageURLs: [{
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: applicant.jobUrl != null,
        picUrls: util.getArray(applicant.jobUrl),
        files: [],
        row: 9,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
        hasPicture: applicant.jobUrl2 != null,
        picUrls: util.getArray(applicant.jobUrl2),
        files: [],
        row: 9,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 11,
      imageURLs: [{
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: applicant.assetUrl != null,
        picUrls: util.getArray(applicant.assetUrl),
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    },
    {
      id: 12,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: applicant.extraUrl != null,
        picUrls: util.getArray(applicant.extraUrl),
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

module.exports = {
  showBizData,
}