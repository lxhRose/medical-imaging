import { Model } from 'dva';
import { fetchLoginUserInfo } from './app-server';

const initialState = {
    loading: false,
    text: '',
    role: 1 //1：用户，2：医生
};

export default <Model> {
    namespace: "App",
    state: initialState,
    reducers: {
        // 菜单伸缩
        changeCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload,
            };
        },
        appendUserInfo(state, {payload}) {
            return {
                ...state,
                role:  payload.body,
            }
        },
        changeRole(state, {payload}) {
            return {
                ...state,
                role: payload.role
            }
        },
        changeLoading(state, {payload}) {
            return {
                ...state,
                loading: payload.loading,
                text: payload.text
            }
        }
    },
    effects: {
        // 获取登录用户信息
        *loginUserInfo({ payload }, { call, put, select }) {
            const response = yield call(fetchLoginUserInfo);
            if(parseInt(response.meta.code, 10) === 200) {
                yield put({
                    type: 'appendUserInfo',
                    payload: response
                })
            }
        },
    }
}
