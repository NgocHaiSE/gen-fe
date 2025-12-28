import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import token from './token';
import CaseConverter from './caseConverter';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://aicancer.io.vn/api';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds
});

// Refresh token logic
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

instance.interceptors.request.use(
    (config) => {
        // console.log('Requests:', config.url, config);
        const tokenObj = token.getTokenObject();
        if (tokenObj.accessToken) {
            config.headers.Authorization = `Bearer ${tokenObj.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        // Convert snake_case response to camelCase
        if (response.data) {
            response.data = CaseConverter.snakeCaseToCamelCase(response.data);
        }
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Skip refresh logic for login and public endpoints
        const isLoginRequest = originalRequest.url?.includes('/user/login');
        const isPublicRequest = originalRequest.url?.includes('/auth/') || isLoginRequest;

        if (error.response?.status === 401 && !originalRequest._retry && !isPublicRequest) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    }
                    return instance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const tokenObj = token.getTokenObject();

            // Only try refresh if we have a refresh token
            if (!tokenObj.refreshToken) {
                token.removeToken();
                window.location.href = '/user/login';
                return Promise.reject(error);
            }

            try {
                const response = await fetch(`${BASE_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenObj.refreshToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Refresh failed');
                }

                const data = await response.json();
                const convertedData = CaseConverter.snakeCaseToCamelCase(data);
                // @ts-ignore
                const newAccessToken = convertedData.accessToken;

                token.save(newAccessToken);
                instance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
                }

                return instance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                token.removeToken();
                window.location.href = '/user/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
