import * as templateService from '../services/template';
import { queryToCommom } from '../utils/utils';

const stateData = {
  list: [],
  detail: {},
};

export default {

  namespace: 'template',

  state: {
    ...stateData
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *initState({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {...stateData} });
    },

    *fetch({ payload: { params } }, { call, put }) {  // eslint-disable-line
      params = params || {};

      const data = {
        list: [],
      };
      const options = {
        ...queryToCommom(params)
      };
      const result = yield call(templateService.getList, options);
      if (result && result.returnCode === '0' && result.returnValue) {
        data.list = result.returnValue.content;
      }
      yield put({ type: 'save', payload: data });

      return result;
    },

    *getDetail({ payload }, { call, put }) {  // eslint-disable-line
      const data = {
        detail: {},
      };
      const result = yield call(templateService.getDetail);
      if (result && result.returnCode === '0' && result.returnValue) {
        data.detail = result.returnValue;
      }
      yield put({ type: 'save', payload: data });
      
      return result;
    },

    *edit({ payload: { params } }, { call, put }) {  // eslint-disable-line
      params = params || {};

      const data = {
        list: [],
      };

      const result = yield call(templateService.edit, params);

      yield put({ type: 'save', payload: data });

      return result;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    delete(state, { payload: { id } }) {
      return { 
        ...state,
        list: state.list.filter(item => item.id !== id),
      };
    }
  },

};
