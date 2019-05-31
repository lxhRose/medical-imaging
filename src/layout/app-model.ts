import { Model } from 'dva';
import { fetchLoginUserInfo, fetchLoginAuthority } from './app-server';

const initialState = {
    loading: false,
    text: '',
    isMobile: false,
    role: 2,//1：用户，2：医生
    isAdmin: false,
    roleArr: [], // 角色1，2，有全部影像的权限，2，有我的关注的权限，3有医生管理的权限，4有审计日志的权限。
    permissions: null
};

export default <Model> {
    namespace: "App",
    state: initialState,
    reducers: {
        appendAuthority(state, { payload }) {
            return {
                ...state,
                roleArr:  payload.body.roles,
                permissions:  payload.body.permissions,
            };
        },
        appendUserInfo(state, {payload}) {
            return {
                ...state,
                role:  payload.body.role,
                isAdmin:  payload.body.isAdmin,
            }
        },
        changeLoading(state, {payload}) {
            return {
                ...state,
                loading: payload.loading,
                text: payload.text
            }
        },
        changeIsMobile(state, {payload}) {
            return {
                ...state,
                isMobile: payload
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
        *loginAuthority({ payload }, { call, put, select }) {
            const response = yield call(fetchLoginAuthority);
            if(parseInt(response.meta.code, 10) === 200) {
                yield put({
                    type: 'appendAuthority',
                    payload: response
                })
            }
        },
    }
}
