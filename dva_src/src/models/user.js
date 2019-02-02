import { extend } from '../utils/utils';
import * as userService from '../services/user';

const stateData = {
};

export default {

  namespace: 'user',

  state: extend(true, {}, stateData),
  // state: {
  //   ...stateData,
  // },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
    },

    *login({ payload }, { call, put }) {
      console.log('model', payload)
      const result = yield call(userService.login, payload);
      console.log('model',result);
      return result;
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
