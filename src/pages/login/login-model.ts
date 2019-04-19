import { Model } from 'dva';
import { fetchLogin, fetchLoginOut, fetchSendSms } from './login-server';

export default <Model> {
    namespace: "login",
    state: {},
    reducers: {},
    effects: {
        *Login({ payload }, { call, put }) {
            const response = yield call(fetchLogin, payload);
            return response;
        },
        *LoginOut({ payload }, { call, put }) {
            const response = yield call(fetchLoginOut, payload);
            return response;
        },
        *sendSms({ payload }, { call, put, select }) {
            const response = yield call(fetchSendSms, payload);
        },
    }
}
