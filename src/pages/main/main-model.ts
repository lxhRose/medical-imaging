/**
 * model
 */
import {fetchExam} from './main-server';

const initialState = {
    data: [], // 列表
    loading: false,
    totalRecord: 1,
    pageNumber: 1,
    pageSize: 10,
    visibleModal: false,
    loadingModal: false,
};

export default {
  namespace: 'main',
  state: initialState,
  effects: {
    // 列表
    *loadList({ payload }, { call, put, select }) {
      const  applyState = yield select(state => state.main);
      const { pageNumber, pageSize } =  applyState;
      const params = {
        pageNumber,
        pageSize,
        ...payload,
      };
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(fetchExam, params);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
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
        data: payload.body.list,
        // totalRecord: payload.body.page.total,
      };
    },
    changeSelectRow(state, { payload }) {
      return {
        ...state,
        selectedRowKeys: payload,
      }
    },
    // 更改页码
    changePage(state, { payload }) {
      return {
        ...state,
        pageNumber: payload,
      };
    },
    // 更改页码大小
    changePageSize(state, { payload }) {
      return {
        ...state,
        pageSize: payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeModalLoading(state, action) {
      return {
        ...state,
        loadingModal: action.payload,
      };
    },
    changeVisibleModal(state, action) {
      return {
        ...state,
        visibleModal: action.payload,
      };
    },
  },
}
