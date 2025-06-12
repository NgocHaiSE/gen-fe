import config from 'config/config';
import token from '@/utils/token';

import { request as requestUmi } from 'umi';

import { cloneDeep, merge } from 'lodash';
import type { RequestInterceptor, RequestOptionsInit, ResponseError } from 'umi-request';
import Reqs, { extend } from 'umi-request';
import CaseConverter from './caseConverter';

// Part 2: Request Interceptors, (use this instead of "headers" directly in request config)
const requestInterceptor: RequestInterceptor = (url, options) => {
  return {
    url,
    options: merge(cloneDeep(options), {
      headers: { Authorization: `Bearer ${token.get().accessToken}` },
    }),
  };
};

const refreshAccessToken = () => {
  //@ts-ignore
  return fetch(configs.apiUrl + '/auth/refresh', {
    headers: {
      Authorization: `Bearer ${token.get().refreshToken}`,
    },
    // data: {},
    method: 'POST',
  });
};

// Part 3: Response Interceptos
const { cancel } = Reqs.CancelToken.source();
let refreshTokenRequest: Promise<any> | null = null;

const responseInterceptor = async (response: Response, options: RequestOptionsInit) => {
  if (!response.ok) {
    cancel('Something errors');
    throw new Error('Something errors');
  }
  const accessTokenExpired = response.status === 401;
  if (accessTokenExpired) {
    try {
      if (!refreshTokenRequest) {
        refreshTokenRequest = refreshAccessToken();
      }
      // multiple requests but "await"ing for only 1 refreshTokenRequest, because of closure
      const res = await refreshTokenRequest;
      if (!res.ok) throw new Error();
      if (res.accessToken) token.save(res.accessToken);
      return requestUmi(
        response.url,
        merge(cloneDeep(options), {
          headers: { Authorization: `Bearer ${res.accessToken}` },
        }),
      );
    } catch (err) {
      console.log('loi roi', err);
      cancel('Session time out.');
      throw err;
    } finally {
      refreshTokenRequest = null;
    }
  }

  const json = CaseConverter.snakeCaseToCamelCase(await response.clone().json());
  return json;
};

const errorHandler = (error: ResponseError) => {
  console.log('HTTP ERROR', error);
  throw error;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  //@ts-ignore
  errorHandler,
  prefix: config.apiUrl,
});
// request拦截器
request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);

export default request;
