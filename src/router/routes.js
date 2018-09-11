
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Login from '@/pages/Login'

// 权限管理
import Permit from '@/pages/access/Permit'
import PermitAdd from '@/pages/access/PermitAdd'
import PermitEdit from '@/pages/access/PermitEdit'
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
      path: '/user',
      name: '后台管理',
      component: Home,
      iconCls: 'icon-team',
      meta: {
        nav: 'home', // 侧边栏导航高亮
      },
      children: [
          { path: '/home', component: Main, name: 'Home', meta:{title: 'Home', nav: 'home', auth: true}, hidden: true},
          { path: '/user', component: User, name: '管理员', meta:{title: '操作人员', nav: 'user', auth: true}},
          { path: '/user_add', component: UserAdd, name: 'user_add', meta:{title: '角色添加', nav: 'user', auth: true}, hidden: true},
          { path: '/user_edit/:user_id', component: UserEdit, name: 'user_edit', meta:{title: '角色编辑', nav: 'user', auth: true}, hidden: true},
          { path: '/role', component: Role, name: '角色', meta:{title: '用户组', nav: 'role', auth: true}},
          { path: '/role_add', component: RoleAdd, name: 'role_add', meta:{title: '角色添加', nav: 'role', auth: true}, hidden: true},
          { path: '/role_edit/:role_id', component: RoleEdit, name: 'role_edit', meta:{title: '角色编辑', nav: 'role', auth: true}, hidden: true},
          { path: '/permit', component: Permit, name: '权限', meta:{title: '权限', nav: 'permit', auth: true}},
          { path: '/permit_add', component: PermitAdd, name: 'permit_add', meta:{title: '角色添加', nav: 'permit', auth: true}, hidden: true},
          { path: '/permit_edit/:permit_id', component: PermitEdit, name: 'permit_edit', meta:{title: '角色编辑', nav: 'permit', auth: true}, hidden: true},
      ]
  },
  // {
  //     path: '/websit',
  //     name: '前台权限',
  //     component: Home,
  //     iconCls: 'icon-team',
  //     meta: {
  //       nav: 'home', // 侧边栏导航高亮
  //     },
  //     children: [
  //         { path: '/user', component: User, name: '网站用户', meta:{title: '操作人员', nav: 'user', auth: true}},
  //         { path: '/user_add', component: UserAdd, name: 'user_add', meta:{title: '角色添加', nav: 'user', auth: true}, hidden: true},
  //         { path: '/user_edit/:user_id', component: UserEdit, name: 'user_edit', meta:{title: '角色编辑', nav: 'user', auth: true}, hidden: true},
  //         { path: '/role', component: Role, name: '角色', meta:{title: '用户组', nav: 'role', auth: true}},
  //         { path: '/role_add', component: RoleAdd, name: 'role_add', meta:{title: '角色添加', nav: 'role', auth: true}, hidden: true},
  //         { path: '/role_edit/:role_id', component: RoleEdit, name: 'role_edit', meta:{title: '角色编辑', nav: 'role', auth: true}, hidden: true},
  //         { path: '/permit', component: Permit, name: '权限', meta:{title: '权限', nav: 'permit', auth: true}},
  //         { path: '/permit_add', component: PermitAdd, name: 'permit_add', meta:{title: '角色添加', nav: 'permit', auth: true}, hidden: true},
  //         { path: '/permit_edit/:permit_id', component: PermitEdit, name: 'permit_edit', meta:{title: '角色编辑', nav: 'permit', auth: true}, hidden: true},
  //     ]
  // }
];




export default routes

