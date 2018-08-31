
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Login from '@/pages/Login'

// 权限管理
import Access from '@/pages/access/Access'
import Role from '@/pages/access/Role'
import User from '@/pages/access/User'

// ---



let routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    // iconCls: 'el-icon-menu',
    meta: {
      title: '用户登录',
      auth: false
    },
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    component: Home,
    iconCls: 'icon-home',
    redirect:'/home',
    meta: {
      title: '首页',
      auth: true
    }
  },
  {
      path: '/list',
      name: '后台权限',
      component: Home,
      iconCls: 'icon-team',
      children: [
          { path: '/home', component: Main, name: 'Home', meta:{title: 'Home', auth: true}, hidden: true},
          { path: '/list', component: User, name: '操作员', meta:{title: '操作人员', auth: true}},
          { path: '/btn', component: Role, name: '角色', meta:{title: '用户组', auth: true}},
          { path: '/access', component: Access, name: '权限', meta:{title: '权限', auth: true}}
      ]
  }
];




export default routes

