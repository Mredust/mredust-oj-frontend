// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 收藏/取消收藏帖子 POST /api/post-favour/ */
export async function postFavourAPI(
  body: PostAPI.PostFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<number>>('/api/post-favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 点赞/取消点赞帖子 POST /api/post-thumb/ */
export async function postThumbAPI(
  body: PostAPI.PostThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<number>>('/api/post-thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建帖子 POST /api/post/add */
export async function addPostAPI(body: PostAPI.PostAddRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<number>>('/api/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除帖子 DELETE /api/post/delete */
export async function deletePostAPI(
  body: CommonAPI.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/post/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取帖子 GET /api/post/get */
export async function getPostByIdAPI(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.IdParams,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<PostAPI.PostVO>>('/api/post/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取帖子列表（管理员） POST /api/post/list */
export async function getPostListAPI(
  body: PostAPI.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<PostAPI.PagePost>>('/api/post/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取帖子列表（用户） POST /api/post/list/vo */
export async function getPostVoPageAPI(
  body: PostAPI.PostQueryRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<PostAPI.PagePost>>('/api/post/list/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新帖子 PUT /api/post/update */
export async function updatePostAPI(body: PostAPI.PostUpdateRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/post/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
