declare namespace ProblemAPI {
  import OrderItem = CommonAPI.OrderItem;
  type ProblemAddRequest = {
    title: string;
    content: string;
    id: number;
    templateCode: string;
    difficulty: number;
    tags: string[];
    testCase: string[][];
    testAnswer: string[];
    runTime: number;
    runMemory: number;
    runStack: number;
    userId: number;
  };

  type ProblemUpdateRequest = {
    id: number;
    title: string;
    content: string;
    templateCode: string;
    difficulty: number;
    tags: string[];
    testCase: string[][];
    testAnswer: string[];
    runTime: number;
    runMemory: number;
    runStack: number;
    userId: number;
  };

  type ProblemQueryRequest = {
    answer: string;
    content: string;
    id: number;
    pageNum: number;
    pageSize: number;
    tags: string[];
    title: string;
    userId: number;
  };

  type ProblemSubmitAddRequest = {
    code: string;
    language: string;
    problemId: number;
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


  type ProblemSubmit = {
    id: number;
    language: string;
    code: string;
    status: number;
    message: string;
    errorMessage: string;
    runTime: number;
    runMemory: number;
    runStack: number;
    problemId: number;
    userId: number;
    createTime: Date;
    updateTime: Date;
    isDelete: number;
  };

  type ProblemVO = {
    id: number;
    title: string;
    content: string;
    difficulty: number;
    status: string;
    tags: string[];
    submitNum: number;
    acceptedNum: number;
    thumbNum: number;
    favourNum: number;
    userId: number;
    createTime: Date;
    templateCode: string;
    testCase: string[][];
    runTime: number;
    runMemory: number;
    runStack: number;
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


  type ProblemSubmitVO = {
    id: number;
    language: string;
    code: string;
    status: number;
    problemId: number;
    userId: number;
    message: string;
    errorMessage: string;
    runTime: number;
    runMemory: number;
    runStack: number;
  };


  type ProblemRunResult = {
    code: number;
    input: string;
    output: string;
  }

  type ProblemRunRequest = {
    code: string;
    input: string;
    language: string;
  }
}
