//util.js
function isValidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}

function isValidNumber(num) {
  var reg = /^\d+(?=\.{0,1}\d+$|$)/;
  if (!reg.test(num)) return false;
  return true;
}

module.exports = {
  isValidPhone,
  isValidNumber
}