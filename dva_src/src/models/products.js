import * as productsService from '../services/products';

const stateData = {
  goods: [],
};

export default {

  namespace: 'products',

  state: {
    ...stateData
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const data = {
        goods: [],
      };
      const result = yield call(productsService.getList);
      data.goods = result.content;
      yield put({ type: 'save', payload: data });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    delete(state, { payload: { id } }) {
      return { 
        ...state,
        goods: state.goods.filter(item => item.id !== id),
      };
    }
  },

};
