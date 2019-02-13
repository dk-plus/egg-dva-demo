import * as templateService from '../services/template';

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
      yield put({ type: 'save', payload: {} });
    },

    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const data = {
        list: [],
      };
      const result = yield call(templateService.getList);
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
