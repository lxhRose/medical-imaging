import {fetchReport} from './report-server';
/**
 * model
 */

const initialState = {
    data: [], // 列表
};

export default {
  namespace: 'report',
  state: initialState,
  effects: {
    // 列表
    *getReport({ payload }, { call, put, select }) {
      const response = yield call(fetchReport, payload);
      if (parseInt(response.meta.code) === 200) {
          yield put({
            type: 'appendList',
            payload: response,
          });
      }
    },
  },

  reducers: {
    appendList(state, { payload }) {
      return {
        ...state,
        data: payload.body,
      };
    }
  },
}
