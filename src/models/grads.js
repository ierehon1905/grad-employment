import { query, search, fetchEdit } from '@/services/grads';

const GradModel = {
  namespace: 'grad',
  state: {
    currentGrad: {},
    searchResults: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('dispatching an action');

      const response = yield call(query, payload);
      console.log('got action res');

      yield put({
        type: 'saveCurrentGrad',
        payload: response.result[0],
      });
    },
    *edit({ payload }, { call, put }) {
      console.log('acting edit', payload);

      const response = yield call(fetchEdit, payload);
      console.log('response ',response);

      yield put({
        type: 'editGrad',
        payload: response,
      });
    },
    *search({ payload }, { call, put }) {
      console.log('dispatching a search action', payload);

      const response = yield call(search, payload);
      console.log('got action res');

      yield put({
        type: 'searchGrad',
        payload: response.result,
      });
    },
  },
  reducers: {
    saveCurrentGrad(state, action) {
      console.log('Saving current grad to global state');

      return { ...state, currentGrad: action.payload || {} };
    },
    editGrad(state, action) {
      console.log(action);

      return { ...state };
    },
    searchGrad(state, action) {
      console.log('Saving search to global state');

      return { ...state, searchResults: action.payload || {} };
    },
  },
};
export default GradModel;
