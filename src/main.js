import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';


import routes from '@/router/routes' // 路由列表

//vuex
import store from './store/store'



Vue.use(ElementUI);
Vue.use(Router);
Vue.use(VueAxios,axios);


// 页面刷新时，重新赋值token
if (sessionStorage.getItem('access_token')) {
    store.commit('set_token', sessionStorage.getItem('access_token'))
}


let router = new Router({
  mode: 'hash',
  routes: routes
});


// 导航钩子权限控制
router.beforeEach( (to, from, next) => {
	// 登录校验 
    if (to.meta.auth && store.state.user.access_token) {
        console.log('登录校验');
        next({ path: '/login' })
    }
    

	// title
  	if (to.meta.title) {
    	document.title = to.meta.title
  	}

	// 菜单权限校验
  	if (to.path === '/forbidden') {
    	next(false)
  	}
  	next()
})


new Vue({
  // el: '#app',
  router,
  store, // 使用 store
  render: h => h(App)
}).$mount('#app');