function getBizData(applicantType, maritalStatus, amount) {
  console.log(applicantType)
  console.log(maritalStatus)
  console.log(amount)
  let data = []
  if (applicantType === '个人') {
    if (maritalStatus === '已婚') {
      if (parseInt(amount) > 10) {
        data = getPersonalAndIsMarriedAndExceedData()
      } else {
        data = getPersonalAndIsMarriedAndLessData()
      }
    } else if (maritalStatus === '离异') {
      if (parseInt(amount) > 10) {
        data = getPersonalAndDivorceAndExceedData()
      } else {
        data = getPersonalAndDivorceAndLessData()
      }
    } else {
      if (parseInt(amount) > 10) {
        data = getPersonalAndNoMarriedAndExceedData()
      } else {
        data = getPersonalAndNoMarriedAndLessData()
      }
    }
  } else {
    if (maritalStatus === '已婚') {
      data = getCpyDataAndIsMarriedData()
    } else {
      data = getCpyDataAndNoMarriedData()
    }
  }
  console.log(data)
  return data
}

function getBizIconUrls(applicantType, maritalStatus, amount) {
  var data = getBizData(applicantType, maritalStatus, amount)
  var iconUrls = []
  for (var i = 0; i < data.length; i++) {
    let file = data[i]
    for (var j = 0; j < file.imageURLs.length; j++) {
      var picture = file.imageURLs[j]
      iconUrls.push(picture.id)
    }
  }
  return iconUrls
}

function getPersonalAndIsMarriedAndExceedData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl2",
        name: "配偶信用报告",
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
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
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
      imageURLs: [{
          id: "mortgageUrl",
          name: "抵押信息",
          hasPicture: false,
          picUrls: [],
          files: [],
          row: 7,
          col: 0,
          isHadden: true
        },
        {
          id: "guaranteeStatementUrl",
          name: "共同担保声明",
          hasPicture: false,
          picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "suretyIdCardUrl2",
        name: "担保人身份证反面",
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
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 9,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
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
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 11,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function getPersonalAndDivorceAndExceedData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        id: "spouseIdMarriageCertificateUrl1",
        name: "离婚征首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "spouseIdMarriageCertificateUrl2",
        name: "离婚征本人页",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 3,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
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
        id: "mortgageUrl",
        name: "抵押信息",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 7,
        col: 0,
        isHadden: true
      }, {
        id: "suretyIdCardUrl2",
        name: "担保人身份证反面",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
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
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 9,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}


function getPersonalAndIsMarriedAndLessData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl2",
        name: "配偶信用报告",
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
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
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
      imageURLs: [{
        id: "mortgageUrl",
        name: "抵押信息",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 7,
        col: 0,
        isHadden: true
      }, {
        id: "aasetUrl",
        name: "资产证明",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
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
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 9,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}


function getPersonalAndDivorceAndLessData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
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
        id: "spouseIdMarriageCertificateUrl1",
        name: "离婚征首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "spouseIdMarriageCertificateUrl2",
        name: "离婚征本人页",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 3,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "assetUrl",
        name: "个人资产证明",
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
        id: "leaseContractUrl",
        name: "租赁合同",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
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
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
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
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 7,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function getCpyDataAndIsMarriedData() {
  return [{
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
        },
        {
          id: "employmentPromotionUrl",
          name: "带动就业人员信息",
          hasPicture: false,
          picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "法人代表身份证反面",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "payTaxesUrl",
        name: "纳税收据",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 5,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl",
        name: "法人征信查询记录",
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
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function getCpyDataAndNoMarriedData() {
  return [{
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
      }]
    }, {
      id: 2,
      imageURLs: [{
        id: "idCardUrl",
        name: "法人代表身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "法人代表身份证反面",
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
        id: "residenceBookletUrl",
        name: "户口本首页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "payTaxesUrl",
        name: "纳税收据",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 3,
        col: 0,
        isHadden: true
      }, {
        id: "creditReportUrl",
        name: "法人征信查询记录",
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
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}



function getPersonalAndNoMarriedAndExceedData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
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
      imageURLs: [{
        id: "mortgageUrl",
        name: "抵押信息",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 8,
        col: 0,
        isHadden: true
      }, {
        id: "suretyIdCardUrl2",
        name: "担保人身份证反面",
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
        id: "jobUrl",
        name: "就业创业证第二页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 9,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
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
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

function getPersonalAndNoMarriedAndLessData() {
  return [{
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
        name: "工资单",
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
        name: "身份证正面",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "身份证反面",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 4,
        col: 0,
        isHadden: true
      }, {
        id: "residenceBookletUrl2",
        name: "户口本人页",
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
        id: "creditReportUrl",
        name: "申请人信用报告",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, {
        id: "propertyCertificateUrl",
        name: "产权证",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 9,
        col: 0,
        isHadden: true
      }, {
        id: "jobUrl2",
        name: "就业创业证第三页",
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
        id: "assetUrl",
        name: "个人资产证明",
        hasPicture: false,
        picUrls: [],
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
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 10,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}

module.exports = {
  getBizData,
  getBizIconUrls
}