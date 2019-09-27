import { query } from '@/services/grads';

const GradModel = {
  namespace: 'grad',
  state: {
    currentGrad: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      console.log('dispatching an action');

      const response = yield call(query);
      console.log('got action res');

      yield put({
        type: 'saveCurrentGrad',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentGrad(state, action) {
      console.log('Saving current grad to global state');

      return { ...state, currentGrad: action.payload || {} };
    },
  },
};
export default GradModel;
