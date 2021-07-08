// 手机正则校验
const checkPhoneRegExp = (phoneNumber) => {
  const phoneRegExp = /^1[3456789]\d{9}$/;
  return !phoneRegExp.test(phoneNumber);
};

module.exports.checkPhoneRegExp = checkPhoneRegExp;
