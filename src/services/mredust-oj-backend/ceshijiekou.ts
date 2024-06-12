// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 测试接口1 GET /api/test/get */
export async function getUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/test/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 测试接口2 GET /api/test/post */
export async function postUsingGet(options?: { [key: string]: any }) {
  return request<string>('/api/test/post', {
    method: 'GET',
    ...(options || {}),
  });
}
