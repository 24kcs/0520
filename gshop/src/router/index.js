// 引入Vue
import Vue from 'vue'
// 引入Vue-Router
import VueRouter from 'vue-router'
// 引入routes
import routes from './routes.js'
import store from '../store'
// 声明使用
Vue.use(VueRouter)
// 向外暴露路由器对象
const router= new VueRouter({
  //mode:'history',
  routes
})
const paths=['/goone','/gotwo']
// 前置路由守卫
router.beforeEach((to, from, next) => {
  // to---:目标路由,要去哪里
  //console.log(to)
  //console.log(from)
  // from--->：当前要离开的路由

  // 如果to中的path的路径是goone或者是gotwo,那么我就让你去登录界面
  //   if(paths.indexOf(to.path)!==-1){
  //   next('/login')
  // }


  // 如果登录了,就跳转到个人中心,否则就去登录界面
  //console.log(store.state.user.user._id)
  //if(!store.state.user.user._id){
    //console.log(!store.state.user.user._id)
   //next('/login')
  //}

  // 如果目标是goone或者是gotwo,那么我要开启守卫了
  if(paths.indexOf(to.path)!==-1){
    // 判断是否登录,登录,去放行,去goone或者是gotwo
    if(!store.state.user.user._id){
     // 没有登录,goone或者是gotwo---就会直接去login
      next('/login')
    }
  }
  // '/order'---订单的路由------>先判断是否登录  to.path==='/order'---->要去订单,判断是否登录, 没有登录那么就---->去登录,登录了,放行--就去'/order'
  // 放行
  next()
})
export default router
// const router=new VueRouter({
//   mode: 'history',
//   routes
// })
// const paths=['/goone','/gotwo']
// router.beforeEach((to, from, next) => {
//   // to: 目标路由
//   // from: 即将离开的路由
//   // next:放行
//   // if(paths.indexOf(to.path)!==-1){
//   //   next('/login')
//   // }
//   // 如果没有登录则去登录界面,
//   if(paths.indexOf(to.path)!==-1){
//     if(!store.state.user.user._id){
//       next('/login')
//     }
//   }

//   next()
  
// })
// export default router
