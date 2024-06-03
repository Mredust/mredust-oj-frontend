export default [
  {
    path: '/user',
    layout: false,
    routes: [{name: '登录', path: '/user/login', component: './User/Login'}],
  },
  {name: '欢迎', path: '/welcome', icon: 'smile', component: './Welcome'},
  {name: '题库', path: '/problemset', icon: 'table', component: './ProblemSet'},
  {name: '题库管理', path: '/list', icon: 'table', component: './TableList', access: 'canAdmin',},
  {path: '/', redirect: '/problemset'},
  {path: '*', layout: false, component: './404'},
];
