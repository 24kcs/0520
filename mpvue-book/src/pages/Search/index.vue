<template>
  <div class="searchContainer">
    <div class="search_header">
      <input
        type="text"
        placeholder="书中自有黄金屋"
        placeholder-class="placeholder"
        v-model="searchText"
        @confirm="searchHandle"
      />
      <span class="close" v-show="isShow" @click="searchText=''">✖</span>
    </div>
    <div class="search_content" v-if="books.length">
      <p>一共搜索到了{{books.length}}本书籍</p>
      <BookList :books="books" />
    </div>
  </div>
</template>
<script>
// 引入request.js文件
import request from '../../utils/request.js'
// 引入组件
import BookList from '../BookList/index.vue'
export default {
  components: {
      BookList
  },
  data() {
    return {
      isShow: false, // 用来显示关闭按钮
      searchText: '', // 用来获取文本框输入内容
      books: [] // 用来存储搜索后的书籍数据
    }
  },
  watch: {
    searchText() {
      this.isShow = this.searchText ? true : false
      this.books=[]
    }
  },
  methods: {
    // 搜索功能
    async searchHandle() {
      const searchText = this.searchText
      const result = await request('/search', { req: searchText })
      if (result) {
        this.books = result
        console.log(this.books)
      }

      // 微信小程序的发送请求的发送输入地址及数据
      // wx.request({
      //   url: '/search',
      //   data: {req:searchText},
      //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   // header: {}, // 设置请求的 header
      //   success: function(res){
      //     // 成功后获取的数据
      //     console.log(res.data) // 数据是有用的
      //   }
      // })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.search_header
  width 90%
  height 80rpx
  border-bottom 1rpx solid #02a774
  margin 0 auto
  position relative
  input
    text-align center
    font-size 40rpx
    line-height 80rpx
    height 100%
  .placeholder
    color #02a774
  .close
    position absolute
    top 20rpx
    right 10rpx
    font-size 40rpx
    z-index 99
</style>