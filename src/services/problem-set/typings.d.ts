declare namespace ProblemAPI {
    import OrderItem = CommonAPI.OrderItem;
    type ProblemProps = {
        id: number;
        userId: number;
        title: string;
        content: string;
        templateCode: templateCode[];
        difficulty: number;
        tags: string[];
        testCase: string[];
        testAnswer: string[];
        runTime: number;
        runMemory: number;
        runStack: number;
    };

    type ProblemQueryRequest = {
        id: number;
        title: string;
        keyword: string,
        tags: string[];
        status: number;
        difficulty: number;
        pageNum: number;
        pageSize: number;
    };

    type ProblemSubmitAddRequest = {
        code: string;
        language: string;
        problemId: number;
    };

    type templateCode = {
        language: string;
        value: string;
        code: string;
    }

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
        templateCode: templateCode[];
        testCase: string[];
        testAnswer: string[];
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

    type PageProblemVo = {
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

    type PageProblemSubmit = {
        countId: string;
        current: number;
        maxLimit: number;
        optimizeCountSql: boolean;
        orders: OrderItem[];
        pages: number;
        records: ProblemSubmit[];
        searchCount: boolean;
        size: number;
        total: number;
    }

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

    type ProblemSubmitQueryRequest = {
        language: string;
        status: number;
        problemId: number;
        message: string;
    }

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

