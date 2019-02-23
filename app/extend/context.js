'use strict';

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

module.exports = {  
  // 输出成功信息
  outputSuccess(data) {
    return {
      errorMessage: '',
      returnCode: '0',
      returnMessage: 'success',
      returnValue: data,
    };
  },

  // 输出错误信息
  outputError(code, errorMessage) {
    return {
      errorMessage,
      returnCode: code,
      returnMessage: '',
      returnValue: '',
    };
  },

  // 转化page对象
  parsePageObject(pageSize, pageNo) {
    if (!pageSize || !pageNo) return {};

    return {
      limit: toInt(pageSize),
      offset: (toInt(pageNo) - 1) * toInt(pageSize),
    };
  },

  // 模糊查询
  parseLikeQuery(attr, value) {
    if (!attr || !value) return {};

    const obj = {};
    obj[attr] = {
      $like: `%${value}%`,
    };
    return obj;
  },

  // 范围查询
  parseBetweenQuery(attr, from, to) {
    if (!attr || !from || !to) return;

    const obj = {};
    obj[attr] = {
      $between: [ from, to ],
    };
    return obj;
  },

  // 排序查询
  parseOrderQuery(value) {
    if (!value) return [];

    value = value.split('_');
    return [value[0], value[1]];
  },

};