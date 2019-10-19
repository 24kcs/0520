// 引入Vue
import Vue from 'vue'
// 引入App.vue
import App from './App.vue'
// 设置提示的信息
Vue.config.productionTip = false
// 设置当前的程序的类型
App.mpType = 'app'
// 实例化Vue的对象
const app = new Vue(App)
// 挂载
app.$mount()
