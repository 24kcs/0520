<template>
  <div class="firstviewContainer">
    <swiper :indicator-dots="current!==3" autoplay @change="changeIndex">
       <swiper-item>
         <img src="/static/imgs/firstview/1.jpg" alt="">
       </swiper-item>
       <swiper-item>
         <img src="/static/imgs/firstview/2.jpg" alt="">
       </swiper-item>
       <swiper-item>
         <img src="/static/imgs/firstview/3.jpg" alt="">
       </swiper-item>
       <swiper-item>
         <img src="/static/imgs/firstview/nvsheng.jpg" alt="">
       </swiper-item>
    </swiper>
   <button class="btn" v-show="current===3" @click="goBooks">开始体验</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current:0 // 设置小圆点是否显示
    }
  },
  methods: {
    // 轮播图的索引改变就可以触发该方法,改变(更新this.current的值)
    changeIndex(event){
      this.current=event.mp.detail.current
    },
    goBooks(){
      // 跳转到books界面
      wx.switchTab({
        url: '/pages/Books/main'
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.firstviewContainer
  width 100%
  height 100%
  position relative
  swiper 
    width 100%
    height 100%
    img
      width 100%
      height 100%
  .btn
    width 200rpx
    height 80rpx
    line-height 80rpx
    text-align center
    background rgba(0,0,0,.3)
    position absolute
    left 50%
    margin-left -100rpx
    bottom 30rpx
    color white
</style>