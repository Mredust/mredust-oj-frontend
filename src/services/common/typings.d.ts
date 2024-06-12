declare namespace CommonAPI {
  type BaseResponse<T> = {
    /** 响应码 */
    code: number;
    /** 响应数据 */
    data: T;
    /** 响应消息 */
    msg: string;
  };

  type DeleteRequest = {
    /** id */
    id?: number;
  };

  type IdParams = {
    /** id */
    id: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };
}
