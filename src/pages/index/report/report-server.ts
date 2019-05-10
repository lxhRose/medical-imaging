import request from '../../../utils/request';

// 登录
export async function fetchReport(params) {
  return request('/screens/report', {
    method: 'GET',
    params,
  });
}
