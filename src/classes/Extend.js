import validator from 'validator'
import jwt from 'jsonwebtoken'
import crypto from 'crypto-js'
import Base from './Base'

export default class Extend extends Base {
  chkPwdStrong(passwd) {
    const repPass = /^[0-9a-zA-Z]{8,16}$/; // 检查密码
    const repPass1 = /[0-9]{1,}/; // 数字
    const repPass2 = /[a-zA-Z]{1,}/; // 字母
    if (!repPass.test(passwd) || passwd == null) {
      // 检查密码
      return false;
    }
    if (!repPass1.test(passwd) || !repPass2.test(passwd)) {
      return false;
    }
    if (passwd.length < 8 || passwd.length > 20) {
      return false;
    }
    return true;
  }
  isMongoId(id) {
    return validator.isMongoId(id);
  }
  isMACAddress(mac) {
    return validator.isMACAddress(mac);
  }
  isMobile(str) {
    const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(16[6-6]{1})|(19[9-9]{1}))+\d{8})$/;
    return re.test(str);
  }
  isIP(str) {
    return validator.isIP(str);
  }
  isEmail(str) {
    return validator.isEmail(str);
  }
  isURL(str) {
    return validator.isURL(str);
  }

  sign(data) {
    return new Promise((resolve, reject) => {
      return jwt.sign(data, process.env.encryptedSalt || '', {
        expiresIn: 60 * 60 * 24 * 7
      }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      });
    })
  }

  verify(token) {
    return new Promise((resolve, reject) => {
      return jwt.verify(token, process.env.encryptedSalt || '', (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      });
    })
  }

  decode(token) {
    try {
      const decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      console.log(error);
    }
  }

  AESEncrypt(data) {
    return crypto.AES.encrypt(data, process.env.encryptedSalt || '').toString();
  }

  AESDecrypt(data) {
    return crypto.AES.decrypt(
      data.toString(),
      process.env.encryptedSalt || ''
    ).toString(crypto.enc.Utf8);
  }
}