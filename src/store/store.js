
import Vue from 'vue'
import vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(vuex);

export default new vuex.Store({
    state,
    mutations,
  	actions,
  	getters
})
