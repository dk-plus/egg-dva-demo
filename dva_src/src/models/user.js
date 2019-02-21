import { extend } from '../utils/utils';
import * as userService from '../services/user';

const stateData = {
};

export default {

  namespace: 'user',

  state: {
    ...stateData,
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
    },

    *login({ payload }, { call, put }) {
      const result = yield call(userService.login, payload);
      return result;
    },

    *logout({ payload }, { call, put }) {
      const result = yield call(userService.logout, payload);
      return result;
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
