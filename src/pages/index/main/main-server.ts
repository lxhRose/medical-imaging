import request from '../../../utils/request';

export async function fetchExam(params) {
    return request('/screens/exam', {
        method: 'GET',
        params,
    });
}

export async function fetchFollowedExams(params) {
    return request('screens/exam/followedExams', {
        method: 'GET',
        params,
    });
}

export async function fetchFollows(examID) {
    return request(`/screens/exam/${examID}/follows`, {
        method: 'POST',
    });
}

export async function fetchDelfollows(examID) {
    return request(`/screens/exam/${examID}/follows`, {
        method: 'DELETE',
    });
}

export async function fetchDoctors(params) {
    return request(`/screens/admin/doctors`, {
        method: 'POST',
        params
    });
}

export async function fetchLoadDoctors(params) {
    return request(`/screens/admin/doctors`, {
        method: 'GET',
        params
    });
}
