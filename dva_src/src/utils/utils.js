import queryString from 'query-string';

/**
 * 数组转KeyValue对象
 * eg. [{value:'1',label:'是'}] => {'1':'是'}
 * @export
 * @param {array} list 待转换对象数组
 * @param {string} [keyName='value'] 数组中对象key
 * @param {string} [valueName='label'] 数组中对象值value
 * @return {object} 转换后的对象
 */
export function arrayToKeyValue(list, keyName = 'value', valueName = 'label') {
  const obj = {};

  list && list.map(m => obj[m[keyName]] = m[valueName]);

  return obj;
}

export function parseQuery(search) {
  let query = {};
  try {
    query = queryString.parse(search);
  } catch (error) {
    query = {};
  }
  return query;
}

export function stringifyQuery(object) {
  let string = "";
  try {
    string = queryString.stringify(object);
  } catch (error) {
    string = "";
  }
  return string;
}

export function queryToCommom(object) {
  let paramObj = {};
  Object.entries(object).forEach(attr => {
    let temp = attr[0].split('f_');
    let newAttr = temp.length > 1 && temp[1].toLowerCase() || temp[0];
    paramObj[newAttr] = object[attr[0]]
  });
  return paramObj;
}

export function getParentPath(location) {
  const { pathname, query } = location;
  let parentPath = "";

  if (!pathname) {
    return parentPath;
  }

  let pathReg = /^\/.*\//;
  parentPath = pathname.match(pathReg)[0];
  let tailReg = /\/$/;
  parentPath = parentPath.replace(tailReg, '');

  return parentPath;
}