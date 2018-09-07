
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Login from '@/pages/Login'

// 权限管理
import Access from '@/pages/access/Access'
import Role from '@/pages/access/Role'
import RoleAdd from '@/pages/access/RoleAdd'
import RoleEdit from '@/pages/access/RoleEdit'
import User from '@/pages/access/User'
import UserAdd from '@/pages/access/UserAdd'
import UserEdit from '@/pages/access/UserEdit'

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
      auth: true,
      nav: 'home'
    }
  },
  {
      path: '/list',
      name: '后台权限',
      component: Home,
      iconCls: 'icon-team',
      meta: {
        nav: 'home', // 侧边栏导航高亮
      },
      children: [
          { path: '/home', component: Main, name: 'Home', meta:{title: 'Home', nav: 'home', auth: true}, hidden: true},
          { path: '/user', component: User, name: '操作员', meta:{title: '操作人员', nav: 'user', auth: true}},
          { path: '/user_add', component: UserAdd, name: 'user_add', meta:{title: '角色添加', nav: 'user', auth: true}, hidden: true},
          { path: '/user_edit/:user_id', component: UserEdit, name: 'user_edit', meta:{title: '角色编辑', nav: 'user', auth: true}, hidden: true},
          { path: '/role', component: Role, name: '角色', meta:{title: '用户组', nav: 'role', auth: true}},
          { path: '/role_add', component: RoleAdd, name: 'role_add', meta:{title: '角色添加', nav: 'role', auth: true}, hidden: true},
          { path: '/role_edit/:role_id', component: RoleEdit, name: 'role_edit', meta:{title: '角色编辑', nav: 'role', auth: true}, hidden: true},
          { path: '/access', component: Access, name: '权限', meta:{title: '权限', nav: 'access', auth: true}}
      ]
  }
];




export default routes

