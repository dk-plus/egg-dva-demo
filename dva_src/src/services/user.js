import { request, post, postData } from '../utils/request';

export function login(args) {
  return postData('/api/login', args);
}