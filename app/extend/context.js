'use strict';

module.exports = {  
  // 输出成功信息
  outputSuccess(data) {
    return {
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: data
    }
  },
  
  // 输出错误信息
  outputError(code, errorMessage) {
    return {
      errorMessage: errorMessage,
      returnCode: code,
      returnMessage: '',
      returnValue: ''
    }
  }
};