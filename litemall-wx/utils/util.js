var api = require('../config/api.js');
var app = getApp();

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Litemall-Token': wx.getStorageSync('token')
      },
      success: function(res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/auth/login/login'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function fillAudit(auditItem, stataus, comment) {
  var temp = auditItem
  if (stataus == 1 || stataus == 4 || stataus == 7 || stataus == 9 || stataus == 10) {
    if (stataus == 9 || stataus == 10) {
      temp.submitStatus = "已受理"
    } else {
      temp.submitStatus = stataus == 1 ? "已提交" : "已审批"
    }
    temp.isHiddenIcon = true
    temp.statusIcon = "passed"
    temp.fontColor = "green"
    temp.statusColor = "#07c160"
    temp.colorIcon = "#07c160"
  } else if (stataus == 3 || stataus == 6 || stataus == 8) {
    temp.submitStatus = "不符合"
    temp.isHiddenIcon = true
    temp.statusIcon = "close"
    temp.fontColor = "red"
    temp.statusColor = "#FE0904"
    temp.colorIcon = "#fe0904"
  } else if (stataus == 2 || stataus == 5) {
    temp.submitStatus = "待补充"
    temp.isHiddenIcon = true
    temp.statusIcon = "warning - o"
    temp.fontColor = "yellow"
    temp.statusColor = "#FE0904"
    temp.colorIcon = "#FF7754"
  }
  if (comment && (stataus != 9 && stataus != 10)) {
    temp.comment = comment
  }
  temp.sValue = stataus
  return temp
}

function filter (name, array) {
  var index = 0
  for (var i = 0; i < array.length; i++) {
    if (array[i] == name) {
      index = i
    }
  }
  return index
}

function getArray(name) {
  var array = []
  if (name != null && name != "") {
    array[0] = name
  }
  return array
}

module.exports = {
  formatTime,
  request,
  redirect,
  showErrorToast,
  fillAudit,
  filter,
  getArray
}


