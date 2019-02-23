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
    // 初始化
    *initState({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {...stateData} });
    },

    // 查询
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
        data.total = result.returnValue.total;
      }
      yield put({ type: 'save', payload: data });

      return result;
    },

    // 查询id
    *getDetail({ payload }, { call, put }) {  // eslint-disable-line
      const data = {
        detail: {},
      };
      const result = yield call(templateService.getDetail, payload);
      if (result && result.returnCode === '0' && result.returnValue) {
        data.detail = result.returnValue;
      }
      yield put({ type: 'save', payload: data });
      
      return result;
    },

    // 创建
    *create({ payload: { params } }, { call, put }) {  // eslint-disable-line
      params = params || {};

      const result = yield call(templateService.create, params);
      return result;
    },

    // 更新
    *update({ payload: { id, params } }, { call, put }) {  // eslint-disable-line
      params = params || {};

      const result = yield call(templateService.update, id, params);
      return result;
    },

    // 更新状态
    *updateStatus({ payload }, { call, put }) {  // eslint-disable-line
      const options = {
        status: payload.status
      };

      const result = yield call(templateService.update, payload.id, options);
      return result;
    },

    // 删除
    *delete({ payload }, { call, put }) {  // eslint-disable-line

      const result = yield call(templateService.deleteActivity, payload);
      return result;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    // delete(state, { payload: { id } }) {
    //   return { 
    //     ...state,
    //     list: state.list.filter(item => item.id !== id),
    //   };
    // }
  },

};
