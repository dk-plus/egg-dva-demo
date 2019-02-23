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

// query字符串转对象
export function parseQuery(search) {
  let query = {};
  try {
    query = queryString.parse(search);
  } catch (error) {
    query = {};
  }
  return query;
}

// 对象转查询参数
export function stringifyQuery(object) {
  let string = "";
  try {
    string = queryString.stringify(object);
  } catch (error) {
    string = "";
  }
  return string;
}

// 查询参数转一般字符串
export function queryToCommom(object) {
  let paramObj = {};
  Object.entries(object).forEach(attr => {
    let temp = attr[0].split('f_');
    let newAttr = temp.length > 1 && temp[1].substring(0,1).toLowerCase().concat(temp[1].substring(1)) || temp[0];
    paramObj[newAttr] = object[attr[0]]
  });
  return paramObj;
}

// 获取父母路径
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

// 驼峰转下划线
export function toLowerLine(str) {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return "_" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === '_') { //如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1);
  }
  return temp;
}

// 下划线转驼峰
export function toCamel(str) {
  return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase();
  });
}

// 获取排序名
export function getSortName(sort, order) {
  if (!sort) return;

  order = order === 'ascend' ? 'ASC' : 'DESC'
  return `${sort}_${order}`;
}