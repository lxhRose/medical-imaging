import request from '../../utils/request';

// 登录
export async function fetchExam(params) {
  return request('/screens/exam', {
    method: 'GET',
    params,
  });
}
