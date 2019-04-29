import request from './../utils/request';

// 获取登录用户信息
export async function fetchLoginUserInfo() {
  return request('/screens/login/role', {
    method: 'GET',
  });
}
