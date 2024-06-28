// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 创建题目 POST /api/problem/add */
export async function addProblemAPI(body: ProblemAPI.ProblemProps, options?: { [key: string]: any }) {
    return request<CommonAPI.BaseResponse<number>>('/api/problem/add', {
        method: 'POST',

        data: body,
        ...(options || {}),
    });
}

/** 删除题目 DELETE /api/problem/delete */
export async function deleteProblemAPI(id: CommonAPI.DeleteRequest) {
    return request<CommonAPI.BaseResponse<boolean>>('/api/problem/delete', {
        method: 'DELETE',

        data: id
    });
}


/** 更新题目 PUT /api/problem/update */
export async function updateProblemAPI(body: ProblemAPI.ProblemProps, options?: { [key: string]: any }) {
    return request<CommonAPI.BaseResponse<boolean>>('/api/problem/update', {
        method: 'PUT',

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
export async function getProblemListAPI(body: ProblemAPI.ProblemQueryRequest) {
    return request<CommonAPI.BaseResponse<ProblemAPI.PageProblem>>('/api/problem/list', {
        method: 'POST',
        data: body
    });
}

/** 分页获取题目列表 POST /api/problem/list/v0 */
export async function getProblemVoListAPI(
    body: ProblemAPI.ProblemQueryRequest,
    options?: { [key: string]: any },
) {
    return request<CommonAPI.BaseResponse<ProblemAPI.PageProblemVo>>('/api/problem/list/vo', {
        method: 'POST',

        data: body,
        ...(options || {}),
    });
}

/** 获取语言列表 GET /api/problem/language */
export async function getProblemLanguageAPI() {
    return request<CommonAPI.BaseResponse<ProblemAPI.templateCode[]>>('/api/problem/language', {
        method: 'GET'
    });
}

/** 获取提交状态列表 GET /api/problem_submit/status */
export async function getSubmitStatusAPI() {
    return request<CommonAPI.BaseResponse<string[]>>('/api/problem_submit/status', {
        method: 'GET'
    });
}

/** problemSubmit POST /api/problem_submit */
export async function problemSubmitAPI(
    body: ProblemAPI.ProblemSubmitAddRequest,
    options?: { [key: string]: any },
) {
    return request<CommonAPI.BaseResponse<number>>('/api/problem_submit/execute', {
        method: 'POST',

        data: body,
        ...(options || {}),
    });
}

/** problemSubmit GET /api/problem_submit/get */
export async function problemSubmitGetByIdAPI(
    param: CommonAPI.IdParams,
    options?: { [key: string]: any },
) {
    return request<CommonAPI.BaseResponse<ProblemAPI.ProblemSubmitVO>>('/api/problem_submit/get', {
        method: 'GET',
        params: {
            ...param,
        },
        ...(options || {}),
    });
}

/** 分页获取题目提交历史 POST /api/problem/list */
export async function getProblemSubmitListAPI(
    body: ProblemAPI.ProblemSubmitQueryRequest,
    options?: { [key: string]: any },
) {
    return request<CommonAPI.BaseResponse<ProblemAPI.PageProblemSubmit>>('/api/problem_submit/list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
