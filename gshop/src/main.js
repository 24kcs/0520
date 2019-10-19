// 引入Vue
import Vue from 'vue'
// 引入App
import App from './App.vue'
// 引入路由器
import router from './router'
// 引入store
import store from './store'
// 引入Header
import Header from './components/Header/Header.vue'
// 引入Star
import Star from './components/Star/Star.vue'
// 引入mint-ui中的buttom
import { Button } from 'mint-ui';


// 引入vee-validtejs文件
import './vee-validate.js'
// 引入mockjs文件
import './mock/mock-server.js'
// 引入CartControl组件
import CartControl from './components/CartControl/CartControl.vue'


import './filter'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入图片
import loading from './common/images/loading.gif'
Vue.use(VueLazyload, {
  loading
})

Vue.component('CartControl', CartControl)
// 注册全局组件
Vue.component(Button.name, Button);
Vue.component(Star.name, Star)
// 注册成全局组件(公共组件)
Vue.component(Header.name, Header)
// 设置控制的提示纤细
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
// 创建实例对象
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router ,// 注册路由器
  store   // 注册仓库
})
