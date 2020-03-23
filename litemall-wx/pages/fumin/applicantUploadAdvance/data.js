function getBizData(applicantType, maritalStatus, amount) {
  console.log(applicantType)
  console.log(maritalStatus)
  console.log(amount)
  let data = []
  if (parseInt(amount) > 10 || applicantType === 'company') {
    //10万以上个人、分个人和企业
    if (applicantType === 'company') {
      data = getCompanyOrExceedData(applicantType)
    } else {
      data = getCompanyOrExceedData(applicantType)
    }
  } else {
    //10万以下个人，分已婚、离异、未婚
    if (maritalStatus === '已婚') {
      data = getPersonalAndIsMarried()
    } else if (maritalStatus === '离异') {
      data = getPersonalAndDivorce()
    } else {
      data = getPersonalAndNoMarriedData()
    }
  }

  // if (applicantType === 'personal') {
  //   if (maritalStatus === '已婚') {
  //     if (parseInt(amount) > 10) {
  //       data = getPersonalAndIsMarriedAndExceedData()
  //     } else {
  //       data = getPersonalAndIsMarriedAndLessData()
  //     }
  //   } else if (maritalStatus === '离异') {
  //     if (parseInt(amount) > 10) {
  //       data = getPersonalAndDivorceAndExceedData()
  //     } else {
  //       data = getPersonalAndDivorceAndLessData()
  //     }
  //   } else {
  //     if (parseInt(amount) > 10) {
  //       data = getPersonalAndNoMarriedAndExceedData()
  //     } else {
  //       data = getPersonalAndNoMarriedAndLessData()
  //     }
  //   }
  // } else {
  //   //if (maritalStatus === '已婚') {
  //   // data = getCpyDataAndIsMarriedData()
  //   //} else {
  //   data = getCpyDataAndNoMarriedData()
  //   //}
  // }
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

function getPersonalAndNoMarriedData() {
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
    },]
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
    },]
  },
  {
    id: 3,
    imageURLs: [{
      id: "guaranteeStatementUrl",
      name: "单身声明",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 2,
      col: 0,
      isHadden: true
    },]
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
    },]
  },
  {
    id: 5,
    imageURLs: [{
      id: "leaseContractUrl",
      name: "租赁合同",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 4,
      col: 0,
      isHadden: true
    }, {
      id: "propertyCertificateUrl",
      name: "产权证",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 4,
      col: 1,
      isHadden: true
    },]
  },
  {
    id: 6,
    imageURLs: [{
      id: "jobUrl",
      name: "就业创业证第五页",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 5,
      col: 0,
      isHadden: true
    },]
  },
  {
    id: 7,
    imageURLs: [{
      id: "houseProprietaryCertificateUrl",
      name: "房产证",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 6,
      col: 0,
      isHadden: true,
    }, {
      id: "vehiclesCertificateUrl",
      name: "车辆权证",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 6,
      col: 1,
      isHadden: true,
    },]
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
    },]
  }
  ]
}

function getPersonalAndDivorce() {
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
    },]
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
    },]
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
    },]
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
    },]
  },
  {
    id: 5,
    imageURLs: [{
      id: "leaseContractUrl",
      name: "租赁合同",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 4,
      col: 0,
      isHadden: true
    }, {
      id: "propertyCertificateUrl",
      name: "产权证",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 4,
      col: 1,
      isHadden: true
    },]
  },
  {
    id: 6,
    imageURLs: [{
      id: "jobUrl",
      name: "就业创业证第五页",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 5,
      col: 0,
      isHadden: true
    },]
  },
  {
    id: 7,
    imageURLs: [{
      id: "houseProprietaryCertificateUrl",
      name: "房产证",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 6,
      col: 0,
      isHadden: true,
    }, {
      id: "vehiclesCertificateUrl",
      name: "车辆权证",
      hasPicture: false,
      picUrls: [],
      files: [],
      row: 6,
      col: 1,
      isHadden: true,
    },]
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
    },]
  }
  ]
}



function getPersonalAndIsMarried() {
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
        name: "就业创业证第五页",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 6,
        col: 0,
        isHadden: true
      }, ]
    },
    {
      id: 8,
      imageURLs: [{
        id: "houseProprietaryCertificateUrl",
        name: "房产证",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 7,
        col: 0,
        isHadden: true,
      }, {
        id: "vehiclesCertificateUrl",
        name: "车辆权证",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 7,
        col: 1,
        isHadden: true,
      }, ]
    },
    {
      id: 9,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 8,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}


function getCompanyOrExceedData(type) {
  var idCardLable1 = ""
  var idCardLable2 = ""
  if ("company" == type) {
    idCardLable1 = "法人代表身份证正面"
    idCardLable2 = "法人代表身份证反面"
  } else {
    idCardLable1 = "申请人身份证正面"
    idCardLable2 = "申请人身份证反面"
  }
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
        name: idCardLable1,
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: idCardLable2,
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
        id: "jobUrl",
        name: "就业创业证（第五页）",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "employmentPromotionUrl",
        name: "带动人员工资流水",
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
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: [],
        files: [],
        row: 3,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}


function getBizTipsText(applicantType, maritalStatus, amount) { 
  if (parseInt(amount) > 10 || applicantType === 'company') {
    return "其他反担保、配偶及资料材料有工作人员提供清单"
  } else {
    return "以上材料提供后等待现成核实通知"
  }
}

module.exports = {
  getBizData,
  getBizIconUrls,
  getBizTipsText
}