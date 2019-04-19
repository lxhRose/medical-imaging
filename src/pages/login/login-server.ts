import request from '../../utils/request';

// 登录
export async function fetchLogin(params) {
  return request('/screens/login/login', {
    method: 'POST',
    params,
  });
}

// 登出
export async function fetchLoginOut(params) {
  return request('/logout', {
    method: 'POST',
    params,
  });
}

export async function fetchSendSms(params) {
    return request('/screens/login/sendSms', {
      method: 'GET',
      params,
    });
  }
  
