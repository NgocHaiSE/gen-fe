// @ts-ignore
/* eslint-disable */
import { server } from '@/pages/Api';
import token from '@/utils/token';
import { request } from '@umijs/max';

/** GET /api/currentUser */
export async function currentUser1(options?: { [key: string]: any }) {
  const accessToken = token.get().accessToken || '';
  if (!accessToken) {
    throw Error();
  }
  return request<{
    data: API.CurrentUser;
  }>(`${server}/user/user-infor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: accessToken,
    ...(options || {}),
  });
}

export async function currentUser(body: object, options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(`${server}/user/user-infor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** logout interface POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/* POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginParams>(`${server}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**  PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
