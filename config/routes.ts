
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: "./User/Register"}
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/add_chart',
    name: '智能分析',
    icon: 'BarChart',
    component: './AddChart',
  },
  { path: '/dot_to', name: '智能绘制', icon: 'Branches', component: './DotTo' },
  {
    path: '/data',
    name: '我的收藏',
    icon: 'Star',
    routes: [
      {
        name: '图表',
        path: 'chart',
        icon: 'smile',
        component: './Data/Chart',
      },
      {
        name: '流程图',
        path: 'graph',
        icon: 'smile',
        component: './Data/Graph',
      },
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
