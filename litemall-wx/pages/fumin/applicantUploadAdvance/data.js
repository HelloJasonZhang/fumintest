var util = require('../../../utils/util.js');

function getBizData(applicantType, maritalStatus, amount, applicantT) {
  console.log(applicantType)
  console.log(maritalStatus)
  console.log(amount)
  let data = []
  if (applicantType === 'company') {
    //企业
    data = getCompany(applicantType, applicantT)
  } else {
    //贷款金额超过15万
    if (parseInt(amount) >= 15) {
      data = getPersonalMore(applicantT)
    } else {
      data = getPersonalLess(applicantT)
    }
  }
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

function getPersonalLess(applicantType) {
  return [{
      id: 1,
      imageURLs: [{
        id: "businessLicenseUrl",
        name: "营业执照",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'businessLicenseUrl'),
        files: [],
        row: 0,
        col: 0,
        isHadden: true,
      }, {
        id: "jobUrl",
        name: "创业就业证照片页",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'jobUrl'),
        files: [],
        row: 0,
        col: 1,
        isHadden: true,
      }]
    },
    {
      id: 2,
      imageURLs: [{
        id: "idCardUrl",
        name: "申请人身份证正面",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'idCardUrl'),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "申请人身份证反面",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'idCardUrl2'),
        files: [],
        row: 1,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 3,
      imageURLs: [{
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'extraUrl'),
        files: [],
        row: 2,
        col: 0,
        isHadden: true,
      }, ]
    }
  ]
}



function getPersonalMore(applicantType) {
  return [{
      id: 1,
      imageURLs: [{
        id: "businessLicenseUrl",
        name: "营业执照",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'businessLicenseUrl'),
        files: [],
        row: 0,
        col: 0,
        isHadden: true,
      }, {
        id: "jobUrl",
        name: "创业就业证照片页",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'jobUrl'),
        files: [],
        row: 0,
        col: 1,
        isHadden: true,
      }]
    },
    {
      id: 2,
      imageURLs: [{
        id: "idCardUrl",
        name: "申请人身份证正面",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'idCardUrl'),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "申请人身份证反面",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'idCardUrl2'),
        files: [],
        row: 1,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 3,
      imageURLs: [{
        id: "employmentPromotionUrl",
        name: "带动员工资流水",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'employmentPromotionUrl'),
        files: [],
        row: 2,
        col: 0,
        isHadden: true
      }, {
        id: "extraUrl",
        name: "其他补充图片",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'extraUrl'),
        files: [],
        row: 2,
        col: 1,
        isHadden: true,
      }, ]
    }
  ]
}


function getCompany(type, applicantType) {
  return [{
      id: 1,
      imageURLs: [{
        id: "businessLicenseUrl",
        name: "营业执照",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'businessLicenseUrl'),
        files: [],
        row: 0,
        col: 0,
        isHadden: true,
      }, {
        id: "jobUrl",
        name: "创业就业证照片页",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'jobUrl'),
        files: [],
        row: 0,
        col: 1,
        isHadden: true
      }, ]
    }, {
      id: 2,
      imageURLs: [{
        id: "idCardUrl",
        name: "法人身份证正面",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'idCardUrl'),
        files: [],
        row: 1,
        col: 0,
        isHadden: true
      }, {
        id: "idCardUrl2",
        name: "法人身份证反面",
        hasPicture: false,
        picUrls: util.getArrayURL(applicantType, 'idCardUrl2'),
        files: [],
        row: 1,
        col: 1,
        isHadden: true
      }, ]
    },
    {
      id: 3,
      imageURLs: [{
          id: "employmentPromotionUrl",
          name: "在职职工花名册",
          hasPicture: false,
          picUrls: util.getArrayURL(applicantType, 'employmentPromotionUrl'),
          files: [],
          row: 2,
          col: 0,
          isHadden: true,
        },
        {
          id: "extraUrl",
          name: "其他补充图片",
          hasPicture: false,
          picUrls: util.getArrayURL(applicantType, 'extraUrl'),
          files: [],
          row: 2,
          col: 1,
          isHadden: true,
        },
      ]
    }
  ]
}


function getBizTipsText(applicantType, maritalStatus, amount) {
  if (applicantType === 'company') {
    return "其他反担保、配偶及其他材料由工作人员提供清单"
  } else {
    return "以上材料提供后等待现场核实通知"
  }
}

module.exports = {
  getBizData,
  getBizIconUrls,
  getBizTipsText
}