import { request, post, postData } from '../utils/request';

export function login(args) {
  return postData('/login', args);
}

export function logout(args) {
  return postData('/logout', args);
}