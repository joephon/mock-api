export default class Base {
  reply(code, msg, data) {
    const result = {
      errCode: code,
      errMsg: msg,
      data: null
    };
    if (data) {
      result.data = data;
    } else {
      delete result.data
    }

    return result;
  }

  success(data) {
    return Base.prototype.reply(0, Base._msg().SUCCESS, data)
  }

  miss(item) {
    return Base.prototype.reply(-1, Base._msg().miss(item))
  }

  invalid(item) {
    return Base.prototype.reply(-1, Base._msg().invalid(item))
  }

  expired() {
    return Base.prototype.reply(-2, Base._msg().ERROR_TOKEN_EXPIRED)
  }

  get msg() {
    return Base._msg()
  }

  static _msg () {
    return {
      SUCCESS: 'SUCCESS',

      ERROR_INVALID_TOKEN: 'ERROR_INVALID_TOKEN',
      ERROR_TOKEN_EXPIRED: 'ERROR_TOKEN_EXPIRED',
      ERROR_SERVER: 'ERROR_SERVER',
      ERROR_WECHAT: 'ERROR_WECHAT',
      ERROR_COMPILE: 'ERROR_COMPILE',

      MISSING_PARAMS: 'MISSING_PARAMS',
      MISSING_PARAM_TOKEN: 'MISSING_PARAMS_TOKEN',
      MISSING_PARAM_ID: 'MISSING_PARAM_ID',
      MISSING_PARAM_TITLE: 'MISSING_PARAM_TITLE',
      MISSING_PARAM_DESCRIPTION: 'MISSING_PARAM_DESCRIPTION',
      MISSING_PARAM_CONTENT: 'MISSING_PARAM_CONTENT',
      MISSING_PARAM_BODY: 'MISSING_PARAM_BODY',
      MISSING_PARAM_ADDRESS: 'MISSING_PARAM_ADDRESS',
      MISSING_PARAM_LOCATION: 'MISSING_PARAM_LOCATION',
      MISSING_PARAM_PHONE_NUMBER: 'MISSING_PARAM_PHONE_NUMBER',
      MISSING_PARAM_CODE: 'MISSING_PARAM_CODE',
      MISSING_PARAM_IV: 'MISSING_PARAM_IV',

      miss(item) {
        return `MISSING_PARAM_${item.toUpperCase()}`
      },
      invalid(item) {
        return `ERROR_INVALID_PARAM_${item.toUpperCase()}`
      },
    }
  }
}