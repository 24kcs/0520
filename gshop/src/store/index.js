// 引入Vue
import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'
// 引入state
import state from './state.js'
// 引入mutations
import mutations from './mutations.js'
// 引入actions
import actions from './actions.js'
// 引入getters
import getters from './getters.js'
// 引入msite模块
import msite from './modules/msite.js'
// 引入user模块
import user from './modules/user.js'
// 引入shop模块
import shop from './modules/shop.js'
// 声明使用
Vue.use(Vuex)
// 向外暴露对象
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    msite,
    user,
    shop
  }
})
// 1.抽取成模块后, 如何获取state中的数据?---在界面中
//computed:{
  // ...mapState(['address'])---不能使用了,必须要通过总的state找对应的数据
//}

// 2.总的actions和模块中的actions中有相同的action(相同的方法--重名了),调用的是谁?
