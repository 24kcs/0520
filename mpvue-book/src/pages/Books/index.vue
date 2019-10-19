<template>
  <div class="booksContainer">
    <div class="books_header">
      <swiper indicator-dots autoplay>
        <swiper-item>
          <img src="/static/imgs/firstview/1.jpg" alt />
        </swiper-item>
        <swiper-item>
          <img src="/static/imgs/firstview/2.jpg" alt />
        </swiper-item>
        <swiper-item>
          <img src="/static/imgs/firstview/3.jpg" alt />
        </swiper-item>
        <swiper-item>
          <img src="/static/imgs/firstview/nvsheng.jpg" alt />
        </swiper-item>
      </swiper>
    </div>
    <div class="books_content">
      <span>全部商品</span>
      <span class="right" @click="goBookList">></span>
    </div>
    <ul class="books_list">
      <li v-for="(book,index) in books" :key="index">
        <img :src="book.image" alt />
        <p>《{{book.title}}》</p>
        <p>作者:{{book.author}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import datas from './datas/data.json'
export default {
  data() {
    return {
      books: []
    }
  },
  mounted() {
    // 界面加载后有数据
    this.books = datas
  },
  methods: {
    // 跳转到bookList界面
    goBookList(){
      // 跳转的同时要传参数this.books
      wx.navigateTo({
        url: '/pages/BookList/main?books='+JSON.stringify(this.books)
      
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.booksContainer
  width 100%
  height 100%
  .books_header
    width 100%
    height 400rpx
    swiper
      width 100%
      height 100%
      img
        width 100%
        height 100%
  .books_content
    padding 10rpx
    span
      font-size 38rpx
      font-weight 700
      &.right
        float right
        color #02a774
  .books_list
    display flex
    flex-wrap wrap
    li
      width 50%
      border-bottom 1rpx solid #666
      box-sizing border-box
      text-align center
      &:nth-child(2n+1)
        border-right 1rpx solid #666
      img
        width 170rpx
        height 170rpx
      p
        margin 10rpx 0
        font-size 32rpx
</style>