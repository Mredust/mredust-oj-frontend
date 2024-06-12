declare namespace API {
  type _1 = {
    /** 账号 */
    account: string;
    /** 用户头像 */
    avatarUrl?: string;
    /** 用户id */
    id: number;
    /** 是否删除 */
    isDelete?: number;
    /** 密码 */
    password: string;
    /** 用户角色 */
    role?: number;
    /** 性别 */
    sex?: number;
    /** 账号状态 */
    status?: number;
    /** 用户昵称 */
    username?: string;
  };

  type Boolean_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: boolean;
    /** 响应消息 */
    msg?: string;
  };

  type DeleteRequest = {
    /** id */
    id?: number;
  };

  type getPostByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getProblemByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type Int_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: number;
    /** 响应消息 */
    msg?: string;
  };

  type JudgeCase = {
    input?: string;
    output?: string;
  };

  type JudgeConfig = {
    memoryLimit?: number;
    stackLimit?: number;
    timeLimit?: number;
  };

  type Long_ = {
    /** 响应码 */
    code?: number;
    /** 响应数据 */
    data?: number;
    /** 响应消息 */
    msg?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type Page_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Pinyin_3[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type Page_ = {
    /** 响应码 */
    code?: number;
    data?: Page_;
    /** 响应消息 */
    msg?: string;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    /** 响应码 */
    code?: number;
    data?: PagePost_;
    /** 响应消息 */
    msg?: string;
  };

  type PageProblem_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Problem[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageProblem_ = {
    /** 响应码 */
    code?: number;
    data?: PageProblem_;
    /** 响应消息 */
    msg?: string;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    /** 响应码 */
    code?: number;
    data?: PageUser_;
    /** 响应消息 */
    msg?: string;
  };

  type Pinyin__ = {
    /** 响应码 */
    code?: number;
    data?: Pinyin_3;
    /** 响应消息 */
    msg?: string;
  };

  type Pinyin_10 = {
    content?: string;
    id?: number;
    /** 当前页码 */
    pageNum?: number;
    /** 页面大小 */
    pageSize?: number;
    searchText?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type Pinyin_11 = {
    answer?: string;
    content?: string;
    id?: number;
    /** 当前页码 */
    pageNum?: number;
    /** 页面大小 */
    pageSize?: number;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type Pinyin_12 = {
    /** 账号 */
    account?: string;
    /** 用户头像 */
    avatarUrl?: string;
    /** 用户id */
    id: number;
    /** 当前页码 */
    pageNum?: number;
    /** 页面大小 */
    pageSize?: number;
    /** 密码 */
    password?: string;
    /** 用户角色 */
    role?: number;
    /** 性别 */
    sex?: number;
    /** 账号状态 */
    status?: number;
    /** 用户昵称 */
    username?: string;
  };

  type Pinyin_13 = {
    /** 账号 */
    account: string;
    /** 确认密码 */
    checkPassword: string;
    /** 密码 */
    password: string;
  };

  type Pinyin_14 = {
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
  };

  type Pinyin_15 = {
    /** 用户头像 */
    avatarUrl?: string;
    /** 创建时间 */
    createTime?: string;
    /** 主键 */
    id?: number;
    /** 角色（0-普通用户 1-管理员） */
    role?: number;
    /** 性别（0-女 1-男 2-未知） */
    sex?: number;
    /** 更新时间 */
    updateTime?: string;
    /** 用户昵称 */
    username?: string;
  };

  type Pinyin_2 = {
    /** 响应码 */
    code?: number;
    data?: Pinyin_15;
    /** 响应消息 */
    msg?: string;
  };

  type Pinyin_3 = {
    /** 内容 */
    content?: string;
    /** 创建时间 */
    createTime?: string;
    /** 收藏数 */
    favourNum?: number;
    /** 是否已收藏 */
    hasFavour?: boolean;
    /** 是否已点赞 */
    hasThumb?: boolean;
    /** 帖子id */
    id?: number;
    /** 标签列表 */
    tagList?: string[];
    /** 点赞数 */
    thumbNum?: number;
    /** 标题 */
    title?: string;
    /** 更新时间 */
    updateTime?: string;
    user?: Pinyin_15;
    /** 创建用户id */
    userId?: number;
  };

  type Pinyin_4 = {
    /** 内容 */
    content?: string;
    /** 标签列表 */
    tags?: string[];
    /** 标题 */
    title: string;
  };

  type Pinyin_5 = {
    /** 账号 */
    account: string;
    /** 密码 */
    password: string;
    /** 昵称 */
    username?: string;
  };

  type Pinyin_6 = {
    answer?: string;
    content?: string;
    difficulty?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type Pinyin_7 = {
    /** 内容 */
    content?: string;
    /** id */
    id: number;
    /** 标签列表 */
    tags?: string[];
    /** 标题 */
    title?: string;
  };

  type Pinyin_8 = {
    /** 用户头像 */
    avatarUrl?: string;
    /** 性别 */
    sex?: number;
    /** 用户昵称 */
    username?: string;
  };

  type Pinyin_9 = {
    answer?: string;
    content?: string;
    difficulty?: string;
    id?: number;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostFavourAddRequest = {
    /** 帖子 id */
    postId: number;
  };

  type PostThumbAddRequest = {
    /** 帖子 id */
    postId: number;
  };

  type Problem = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    difficulty?: number;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    judgeCase?: string;
    judgeConfig?: string;
    submitNum?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type ProblemSubmit = {
    code?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    judgeInfo?: string;
    language?: string;
    problemId?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
  };

  type ProblemSubmit_ = {
    /** 响应码 */
    code?: number;
    data?: ProblemSubmit;
    /** 响应消息 */
    msg?: string;
  };

  type ProblemSubmitAddRequest = {
    code?: string;
    language?: string;
    problemId?: number;
  };

  type ProblemVO = {
    acceptedNum?: number;
    answer?: string;
    content?: string;
    createTime?: string;
    difficulty?: number;
    favourNum?: number;
    id?: number;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tags?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type ProblemVO_ = {
    /** 响应码 */
    code?: number;
    data?: ProblemVO;
    /** 响应消息 */
    msg?: string;
  };

  type User = {
    account?: string;
    avatarUrl?: string;
    createTime?: string;
    id?: number;
    isDelete?: number;
    password?: string;
    role?: number;
    sex?: number;
    status?: number;
    updateTime?: string;
    username?: string;
  };

  type User_ = {
    /** 响应码 */
    code?: number;
    data?: User;
    /** 响应消息 */
    msg?: string;
  };
}
