import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export  function request(url, option) {
  return fetch(url, option)
  .then(checkStatus)
  .then(parseJSON)
  .then(data => data)
  .catch(err => err);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export  function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export  function putData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export  function deleteData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}
// /**
//  * promise xhr
//  * 
//  * @param {string} url    请求地址 
//  * @param {string} type   类型
//  * @param {object} data   参数
//  * @return {promise}      promise对象
//  */
// export  function fetch(url, type, data) {
//   data = data && JSON.stringify(data) || null;
//   return new Promise((resolve,  reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = () => {
//       let response;
//       try {
//         response = JSON.parse(xhr.response);
//       } catch (error) {
//         console.log('response is not JSON: ', error);
//       }
//       resolve(response);
//     };
//     xhr.onerror = (error) => {
//       reject(error);
//     };
//     xhr.open(type, url, true);
//     xhr.setRequestHeader('Content-Type','application/json');
//     xhr.send(data);
//   });
// }

// /**
//  * promise get
//  * 
//  * @param {string} url  请求地址
//  * @return {promise}    promise对象
//  */
// export  function get(url) {
//   return fetch(url, 'GET');
// }

// /**
//  * promise post
//  * 
//  * @param {string} url    请求地址
//  * @param {object} data   请求参数
//  * @return {promise}      promise对象
//  */
// export  function post(url, data) {
//   return fetch(url, 'POST', data);
// }