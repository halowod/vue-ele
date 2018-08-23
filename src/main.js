import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/icon/iconfont.css';


import routes from '@/router/routes' // 路由列表

//vuex
import store from './store/store'



Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueAxios,axios);


// 页面刷新时，重新赋值token

if (sessionStorage.getItem('access_token')) {
    store.commit('set_token', sessionStorage.getItem('access_token'));
}



// 添加请求拦截器 - 在请求或响应被 then 或 catch 处理前拦截它们。
axios.interceptors.request.use(function (config) {

    // loading 图表 展示

    // 设置默认的 api 请求地址
    axios.defaults.baseURL = 'http://lumenapi.local/api';
    axios.defaults.headers.common['Signature'] = '2D07A24FB20651C0799225A6CB32467E13BE0D60';

    config.baseURL = 'http://lumenapi.local/api';
    config.headers.common['Signature'] = '2D07A24FB20651C0799225A6CB32467E13BE0D60';

    if (store.getters.getToken) {
        config.headers.common['Authorization'] = sessionStorage.getItem('token_type') + ' ' + store.getters.getToken;
    }

    // pass

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });



let router = new Router({
  mode: 'hash',
  routes: routes
});



// 导航钩子权限控制
router.beforeEach( (to, from, next) => {

	// 登录校验 
    if (to.meta.auth && !store.getters.getToken) {
        // next({ path: '/login' });
        router.push({name: 'login'});
    }

    // 销毁 token
    if (new Date().getTime() > new Date(sessionStorage.getItem('expired_at')).getTime()) {
      // store.commit('del_token');
    }

    // 刷新token  大于 refresh_at 小于 expire_at
    if (true) {

    }

    // 页面title
  	if (to.meta.title) {
    	document.title = '管理中心 - ' +to.meta.title
  	}

    // 菜单权限校验
  	if (to.path === '/forbidden') {
    	next(false)
  	}
  	next()
});


new Vue({
  // el: '#app',
  router,
  store, // 使用 store
  render: h => h(App)
}).$mount('#app');