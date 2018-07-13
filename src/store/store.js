
import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        count: 12
    },
    mutations: {
	    increment (state) {
	      	state.count++
	      	//还可以在这里执行其他的操作改变state---------------
	    }
  	},
  	actions: {
	    incrementAction (context) {
	      	context.commit('increment')
	      	//还可以在这里触发其他的mutations方法---------------
	    }
  	},
  	getters: {
	    incrementGetters: state => state.count*2
	    // incrementGetters (state) {
	    // 	return state.count*2
	    // }
  	}
})