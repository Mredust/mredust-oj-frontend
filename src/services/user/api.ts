// @ts-ignore
/* eslint-disable */
import {request} from '@umijs/max';

/** 用户注册 POST /api/user/register */
export async function userRegisterAPI(body: UserAPI.UserRegisterRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<number>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录 POST /api/user/login */
export async function userLoginUAPI(body: UserAPI.UserLoginRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<UserAPI.UserVO>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注销 POST /api/user/logout */
export async function userLogoutAPI(options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}


/** 获取当前登录用户信息 GET /api/user/get/login-user */
export async function getLoginUserAPI(options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<UserAPI.UserVO>>('/api/user/get/login-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加用户 POST /api/user/add */
export async function addUserAPI(body: UserAPI.UserAddRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<number>>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /api/user/delete */
export async function deleteUserAPI(
  body: CommonAPI.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 用于管理员更新用户信息时的请求数据 PUT /api/user/update */
export async function updateUserAPI(body: UserAPI.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新个人信息 用于用户更新个人信息时的请求数据 PUT /api/user/update/my */
export async function updateMyUserAPI(body: UserAPI.UserUpdateMyRequest, options?: { [key: string]: any }) {
  return request<CommonAPI.BaseResponse<boolean>>('/api/user/update/my', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 管理员根据ID获取用户信息 用于管理员根据用户id获取用户信息 GET /api/user/get */
export async function getUserByIdAPI(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CommonAPI.IdParams,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<UserAPI.User>>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 用户列表 用于管理员获取用户列表时的请求数据 POST /api/user/list */
export async function getUserListByPageAPI(
  body: UserAPI.UserQueryRequest,
  options?: { [key: string]: any },
) {
  return request<CommonAPI.BaseResponse<UserAPI.PageUser>>('/api/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
