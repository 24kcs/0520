<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter" />
  </div>
</template>
<script>
// 引入FooterGuide.vue组件
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
// 引入vuex
//import {RECEIVE_USER} from './store/mutation-types'
export default {
  components: {
    FooterGuide
  },
  async mounted () {
    this.$store.dispatch('getAddress')

    this.$store.dispatch('autoLogin')

    // 测试
    //this.$store.dispatch('xxx')
   
    //this.$store.dispatch('saveUser',user)
    // this.$store.dispatch('getCategorys')
    // this.$store.dispatch('getShops')
  }
  //async mounted() {
    // 地址信息
    // const result1 = await reqAddress("116.36867", "40.10038");
    // const result2 = await reqCategorys();
    // const result3 = await reqShops({ longitude: "116.36867", latitude: "40.10038" });
    // console.log(result1)
    // console.log(result2)
    // console.log(result3)
  //}
};
</script>
<style lang="stylus" rel="stylesheet/stylus"></style>
