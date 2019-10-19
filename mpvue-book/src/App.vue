<script>
import request from './utils/request.js'
export default {
  mounted() {
    // 获取用户的信息
    wx.login({
      success: async res => {
        // 获取code值
        const code = res.code
        console.log('登录后的code值:'+code)
        // 向后台发送请求,后台会有appId和secret +code====>3码一起向微信的服务器后台发送请求
        const result=await request('/getopenId',{
          code
        })

        console.log('openid:'+result) //openid
        wx.setStorage({
          key: 'openId',
          data: result
        
        })
      },fail:(error) =>{
          console.log('错误信息')
      }
    })
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
page
  width 100%
  height 100%
</style>