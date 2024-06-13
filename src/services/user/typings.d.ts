declare namespace UserAPI {
  import OrderItem = CommonAPI.OrderItem;
  type User = {
    account: string;
    avatarUrl: string;
    createTime: string;
    id: number;
    isDelete: number;
    password: string;
    role: number;
    sex: number;
    status: number;
    updateTime: string;
    username: string;
  };

  type UserLoginRequest = {
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
  };

  type UserVO = {
    /** 用户头像 */
    avatarUrl: string;
    /** 创建时间 */
    createTime: string;
    /** 主键 */
    id: number;
    /** 角色（0-普通用户 1-管理员） */
    role: number;
    /** 性别（0-女 1-男 2-未知） */
    sex: number;
    /** 更新时间 */
    updateTime: string;
    /** 用户昵称 */
    username: string;
  };

  type UserRegisterRequest = {
    /** 账号 */
    account: string;
    /** 确认密码 */
    checkPassword: string;
    /** 密码 */
    password: string;
  };

  type UserAddRequest = {
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
    /** 昵称 */
    username: string;
  };
  type UserUpdateRequest = {
    /** 账号 */
    account: string;
    /** 用户头像 */
    avatarUrl: string;
    /** 用户id */
    id: number;
    /** 是否删除 */
    isDelete: number;
    /** 密码 */
    password: string;
    /** 用户角色 */
    role: number;
    /** 性别 */
    sex: number;
    /** 账号状态 */
    status: number;
    /** 用户昵称 */
    username: string;
  };

  type UserUpdateMyRequest = {
    /** 用户头像 */
    avatarUrl: string;
    /** 性别 */
    sex: number;
    /** 用户昵称 */
    username: string;
  };

  type UserQueryRequest = {
    /** 账号 */
    account: string;
    /** 用户头像 */
    avatarUrl: string;
    /** 用户id */
    id: number;
    /** 当前页码 */
    pageNum: number;
    /** 页面大小 */
    pageSize: number;
    /** 密码 */
    password: string;
    /** 用户角色 */
    role: number;
    /** 性别 */
    sex: number;
    /** 账号状态 */
    status: number;
    /** 用户昵称 */
    username: string;
  };


  type PageUser = {
    countId: string;
    current: number;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: OrderItem[];
    pages: number;
    records: User[];
    searchCount: boolean;
    size: number;
    total: number;
  };


}
