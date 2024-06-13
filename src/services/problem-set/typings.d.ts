declare namespace ProblemAPI {
  import OrderItem = CommonAPI.OrderItem;
  type ProblemAddRequest = {
    answer: string;
    content: string;
    difficulty: number;
    judgeCase: JudgeCase[];
    judgeConfig: JudgeConfig;
    tags: string[];
    title: string;
  };

  type ProblemVO = {
    acceptedNum: number;
    answer: string;
    content: string;
    createTime: string;
    difficulty: number;
    favourNum: number;
    id: number;
    judgeCase: JudgeCase[];
    judgeConfig: JudgeConfig;
    submitNum: number;
    tags: string[];
    thumbNum: number;
    title: string;
    updateTime: string;
    userId: number;
  };

  type ProblemQueryRequest = {
    answer: string;
    content: string;
    id: number;
    /** 当前页码 */
    pageNum: number;
    /** 页面大小 */
    pageSize: number;
    tags: string[];
    title: string;
    userId: number;
  };

  type PageProblem = {
    countId: string;
    current: number;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: OrderItem[];
    pages: number;
    records: ProblemVO[];
    searchCount: boolean;
    size: number;
    total: number;
  };

  type ProblemUpdateRequest = {
    answer: string;
    content: string;
    difficulty: string;
    id: number;
    judgeCase: JudgeCase[];
    judgeConfig: JudgeConfig;
    tags: string[];
    title: string;
  };
  type JudgeCase = {
    input: string;
    output: string;
  };

  type JudgeConfig = {
    memoryLimit: number;
    stackLimit: number;
    timeLimit: number;
  };

  type Problem = {
    acceptedNum: number;
    answer: string;
    content: string;
    createTime: string;
    difficulty: number;
    favourNum: number;
    id: number;
    isDelete: number;
    judgeCase: string;
    judgeConfig: string;
    submitNum: number;
    tags: string;
    thumbNum: number;
    title: string;
    updateTime: string;
    userId: number;
  };

  type ProblemSubmitAddRequest = {
    code: string;
    language: string;
    problemId: number;
  };

  type ProblemSubmit = {
    code: string;
    createTime: string;
    id: number;
    isDelete: number;
    judgeInfo: string;
    language: string;
    problemId: number;
    status: number;
    updateTime: string;
    userId: number;
  };
}
