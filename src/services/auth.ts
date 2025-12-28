import request from '@/utils/request';
import token from '@/utils/token';

/** Login interface POST /user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
    return request('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** Get current user POST /user/current-user */
export async function currentUser(options?: { [key: string]: any }) {
    const accessToken = token.get();
    return request<{
        data: API.CurrentUser;
    }>('/user/current-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { token: accessToken },
        ...(options || {}),
    });
}

/** Logout POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
    token.removeToken();
    // Trying to match gen-fe path, assuming it is /api/login/outLogin relative to base or just /login/outLogin
    // gen-fe uses '/api/login/outLogin' but with 'server' variable prefix?
    // gen-fe: request<Record<string, any>>('/api/login/outLogin' ...
    // If gen-fe request uses prefix, it might be double prefixed or absolute.
    // Given base API is https://aicancer.io.vn/api, likely endpoint is /login/outLogin or literally /api/login/outLogin
    // safely trying /login/outLogin first as it matches the pattern of /user/login
    return request<Record<string, any>>('/login/outLogin', {
        method: 'POST',
        ...(options || {}),
    });
}
