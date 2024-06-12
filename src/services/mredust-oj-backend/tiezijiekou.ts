// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 收藏/取消收藏帖子 POST /api/post-favour/ */
export async function postFavourUsingPost(
  body: API.PostFavourAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int_>('/api/post-favour/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 点赞/取消点赞帖子 POST /api/post-thumb/ */
export async function postThumbUsingPost(
  body: API.PostThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.Int_>('/api/post-thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建帖子 POST /api/post/add */
export async function addPostUsingPost(body: API.Pinyin_4, options?: { [key: string]: any }) {
  return request<API.Long_>('/api/post/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除帖子 DELETE /api/post/delete */
export async function deletePostUsingDelete(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.Boolean_>('/api/post/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据 id 获取帖子 GET /api/post/get */
export async function getPostByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPostByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.Pinyin__>('/api/post/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取帖子列表（管理员） POST /api/post/list */
export async function getPostListByPageUsingPost(
  body: API.Pinyin_10,
  options?: { [key: string]: any },
) {
  return request<API.PagePost_>('/api/post/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页获取帖子列表（用户） POST /api/post/list/vo */
export async function getPostVoPageUsingPost(
  body: API.Pinyin_10,
  options?: { [key: string]: any },
) {
  return request<API.Page_>('/api/post/list/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新帖子 PUT /api/post/update */
export async function updatePostUsingPut(body: API.Pinyin_7, options?: { [key: string]: any }) {
  return request<API.Boolean_>('/api/post/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
