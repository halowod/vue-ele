
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Login from '@/pages/Login'
import Button from '@/components/Button'
import List from '@/components/List'



let routes = [
  {
    path: '/login',
    name: '登录',
    component: Login,
    // iconCls: 'el-icon-menu',
    meta: {
      title: '用户登录'
    },
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    component: Home,
    iconCls: 'el-icon-menu',
    redirect:'/home',
    meta: {
      title: '首页'
    }
  },
  {
      path: '/',
      name: '权限管理',
      component: Home,
      iconCls: 'el-icon-location',
      children: [
          { path: '/home', component: Main, name: 'Home', meta:{title: 'Home'}, hidden: true},
          { path: '/list', component: List, name: '列表', meta:{title: '列表'}},
          { path: '/btn', component: Button, name: '按钮', meta:{title: '按钮'}}
      ]
  }
];




export default routes

