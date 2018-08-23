
import Home from '@/pages/Home'
import Main from '@/pages/Main'
import Login from '@/pages/Login'
import Button from '@/components/Button'
import List from '@/components/List'



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
      name: '权限管理',
      component: Home,
      iconCls: 'icon-team',
      children: [
          { path: '/home', component: Main, name: 'Home', meta:{title: 'Home', auth: true}, hidden: true},
          { path: '/list', component: List, name: '列表', meta:{title: '列表', auth: true}},
          { path: '/btn', component: Button, name: '按钮', meta:{title: '按钮', auth: true}}
      ]
  }
];




export default routes

