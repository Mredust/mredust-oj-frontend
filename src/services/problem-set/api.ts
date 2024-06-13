// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 创建题目 POST /api/problem/add */
export async function addProblemAPI(body: ProblemAPI.ProblemAddRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<number>>('/api/problem/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除题目 DELETE /api/problem/delete */
export async function deleteProblemAPI(
  body: CommonAPI.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/problem/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取题目 GET /api/problem/get */
export async function getProblemByIdAPI(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  param: CommonAPI.IdParams,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<ProblemAPI.ProblemVO>>('/api/problem/get', {
    method: 'GET',
    params: {
      ...param,
    },
    ...(options || {}),
  });
}

/** 分页获取题目列表 POST /api/problem/list */
export async function getProblemListAPI(
  body: ProblemAPI.ProblemQueryRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<ProblemAPI.PageProblem>>('/api/problem/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新题目 PUT /api/problem/update */
export async function updateProblemAPI(body: ProblemAPI.ProblemUpdateRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/problem/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** problemSubmit POST /api/problem_submit */
export async function problemSubmitAPI(
  body: ProblemAPI.ProblemSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<ProblemAPI.ProblemSubmit>>('/api/problem_submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
