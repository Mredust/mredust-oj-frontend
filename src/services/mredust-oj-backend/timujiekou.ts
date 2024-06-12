// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建题目 POST /api/problem/add */
export async function addProblemUsingPost(body: API.Pinyin_6, options?: { [key: string]: any }) {
  return request<API.Long_>('/api/problem/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题目 DELETE /api/problem/delete */
export async function deleteProblemUsingDelete(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.Boolean_>('/api/problem/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取题目 GET /api/problem/get */
export async function getProblemByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProblemByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.ProblemVO_>('/api/problem/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取题目列表 POST /api/problem/list */
export async function getProblemListByPageUsingPost(
  body: API.Pinyin_11,
  options?: { [key: string]: any },
) {
  return request<API.PageProblem_>('/api/problem/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新题目 PUT /api/problem/update */
export async function updateProblemUsingPut(body: API.Pinyin_9, options?: { [key: string]: any }) {
  return request<API.Boolean_>('/api/problem/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
