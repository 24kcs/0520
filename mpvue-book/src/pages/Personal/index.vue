<template>
  <div class="personalContainer">
    <div class="personal_header">
      <img :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/imgs/personal/personal.png'" alt />
      <button open-type="getUserInfo" @getuserinfo="getUser">
        {{
        userInfo.nickName?userInfo.nickName:'登录'
        }}
      </button>
    </div>
    <div class="personal_content">
      <div class="cards">
        <span>我的收藏</span>
        <span class="right">more></span>
      </div>
      <div class="cards">
        <span>扫码看书</span>
        <span class="right">more></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  mounted() {
    wx.getUserInfo({
      success: (res)=> {
        // success
        //  this.userInfo=res.
        //console.log(res)
        //if (res.userInfo) {
          this.userInfo = res.userInfo
        //}
        console.log('成功了')
      },
      fail: (error)=> {
        console.log(error)
        // fail
       // console.log(error)
      }
    })
  },
  methods: {
    // 获取用户信息
    getUser(evt) {
      if (evt.mp.detail.userInfo) {
        this.userInfo = evt.mp.detail.userInfo
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.personalContainer
  display flex
  flex-direction column
  .personal_header
    width 100%
    height 140rpx
    background-color #02a774
    display flex
    align-items center
    padding 0 20rpx
    img
      width 100rpx
      height 100rpx
      vertical-align middle
      border-radius 50%
    button
      height 60rpx
      margin-left 20rpx
      font-size 28rpx
      background rgba(255, 255, 255, 0.3)
      line-height 60rpx
  .personal_content
    width 90%
    margin 0 auto
    .cards
      border 1rpx solid #ccc
      padding 10rpx
      span
        font-size 34rpx
        &.right
          float right
</style>