import queryString from 'query-string';
import { request, postData, putData, deleteData } from '../utils/request';

// 查询
export function getList(args) {
  let query = queryString.stringify(args);
  query = query ? `?${query}` : '';
  return request(`/activity/${query}`);
}

// 查询id
export function getDetail(id) {
  return request(`/activity/${id}`);
}

// 创建
export function create(args) {
  return postData('/activity', args);
}

// 更新
export function update(id, args) {
  return putData(`/activity/${id}`, args);
}

// 删除
export function deleteActivity(id) {
  return deleteData(`/activity/${id}`);
}