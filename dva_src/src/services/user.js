import {request, post, postData} from '../utils/request';

export function login(args) {
  console.log('req', args)
  // return post('/api/login', args);
  return postData('/api/login', args);
}