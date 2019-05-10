const initialState = {
    showReport: false,
    option: {}
};

export default {
  namespace: 'index',
  state: initialState,
  reducers: {
    appendOption(state, { payload }) {
      return {
        ...state,
        option: payload
      };
    },
    changeShowReport(state, { payload }) {
      return {
        ...state,
        showReport: payload,
      }
    },
  },
}
