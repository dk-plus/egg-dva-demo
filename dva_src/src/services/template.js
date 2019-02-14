import { request, post, postData } from '../utils/request';

export function getList(args) {
  return postData('/api/activity/queryAll', args);
}

export function getDetail(args) {
  return postData('/api/activity/query', args);
}

export function edit(args) {
  return postData('/api/activity/edit', args);
}