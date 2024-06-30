export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {name: '登录', path: '/user/login', component: './User/Login'},
            {name: '注册', path: '/user/register', component: './User/Register'},
        ],
    },
    {name: '欢迎', path: '/welcome', icon: 'smile', component: './Welcome'},
    {name: '题库', path: '/problemset', icon: 'table', component: './Problem/ProblemSet'},
    {
        path: '/problemset',
        routes: [
            {name: '题目详情', path: '/problemset/:id', component: './Problem/ProblemDetail', hideInMenu: true},
        ],
    },
    {
        name: '题库管理',
        path: '/admin/problem-manage',
        icon: 'table',
        component: './Admin/ProblemManage/ProblemList',
        access: 'canAdmin',
    },
    {
        path: '/admin/problem-manage',
        routes: [
            {path: '/admin/problem-manage/table', component: './Admin/ProblemManage/ProblemTable'},
        ],
    },
    {name: '用户管理', path: '/admin/user-manage', icon: 'table', component: './Admin/UserManage', access: 'canAdmin',},
    {path: '/', redirect: '/welcome'},
    {path: '*', layout: false, component: './404'},
];
