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