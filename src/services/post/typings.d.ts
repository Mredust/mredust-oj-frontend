declare namespace PostAPI {
  import OrderItem = CommonAPI.OrderItem;
  type PostFavourAddRequest = {
    /** 帖子 id */
    postId: number;
  };
  type PostThumbAddRequest = {
    /** 帖子 id */
    postId: number;
  };

  type PostAddRequest = {
    /** 内容 */
    content?: string;
    /** 标签列表 */
    tags?: string[];
    /** 标题 */
    title: string;
  };

  type PostVO = {
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
    user?: UserAPI.UserVO;
    /** 创建用户id */
    userId?: number;
  };

  type PostQueryRequest = {
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

  type PagePost = {
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

  type PostUpdateRequest = {
    /** 内容 */
    content?: string;
    /** id */
    id: number;
    /** 标签列表 */
    tags?: string[];
    /** 标题 */
    title?: string;
  };

  type PostQueryRequest = {
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

  type PagePost = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };
}
