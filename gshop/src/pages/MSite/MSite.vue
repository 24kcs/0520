<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name||'正在定位中...'">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(category,index) in categorys"
              :key="index"
            >
              <div class="food_container">
                <img :src="`https://fuss10.elemecdn.com`+category.image_url" />
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>
<script>
// 引入ShopList组件
import ShopList from '../../components/ShopList/ShopList.vue'
// 引入Swiper
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
// 引入Vuex
import { mapState } from 'vuex'
export default {
  components: {
    ShopList
  },
  computed: {
    // 从vuex中的state中获取数据
    // ...mapState(['address', 'categorys']),
    ...mapState({
      address: state => state.msite.address,
      categorys: state => state.msite.categorys
    }),
    /**
     * 每一屏展示8条数据
     * categorys---数组---16条数据
     * 界面显示多少个屏---要通过categorys来进行计算有多少屏
     * 显示多少个屏使用一个大数组来进行存储---bigArr-----2条
     * 每一个屏中显示多少条数据用一个小数组来进行存储---smallArr---8条
     * 大数组中应该存储两个小数组,每个小数组中有8条数据
     *
     *
     *
     *
     *
     *
     */
    categorysArr() {
      // 获取的是一个食品分类的数组(16条数据)
      const { categorys } = this
      // 存储的是多个小数组,小数组的个数决定了有多少页
      let bigArr = []
      let smallArr = []
      // 遍历数据,进行大数组的装载数据
      categorys.forEach(category => {
        // 小数组中没有数据,则把小数组添加到大数组中
        if (smallArr.length === 0) {
          bigArr.push(smallArr)
        }
        // 向小数组中添加数据
        smallArr.push(category)
        // 判断,如果小数组中的数据的个数为8的时候,重新下一次的添加数据(小数组重新添加到大的数组中,小数组继续添加数据)
        if (smallArr.length === 8) {
          smallArr = []
        }
      })

      return bigArr
    }
  },
  async mounted() {
    // 提交action---获取的商铺的信息
    this.$store.dispatch('getShops')
    // 提交action---获取的是食品分类信息
    await this.$store.dispatch('getCategorys')
    // 第三种
    this.$nextTick(() => {
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        }
      })
    })
    // 第二种
    // this.$store.dispatch('getCategorys', () => {
    //   this.$nextTick(() => {
    //     var mySwiper = new Swiper('.swiper-container', {
    //       loop: true, // 循环模式选项
    //       // 如果需要分页器
    //       pagination: {
    //         el: '.swiper-pagination'
    //       }
    //     })
    //   })
    // })
    // 创建Swiper对象,实现轮播图
  }
  // 第一种解决方式
  // watch: {
  //   categorys() {
  //     this.$nextTick(() => {
  //       var mySwiper = new Swiper('.swiper-container', {
  //         loop: true, // 循环模式选项
  //         // 如果需要分页器
  //         pagination: {
  //           el: '.swiper-pagination'
  //         }
  //       })
  //     })
  //   }
  // }
  // watch: {
  //   categorys() {
  //     setTimeout(() => {
  //       /* eslint-disable */
  //       var mySwiper = new Swiper('.swiper-container', {
  //         loop: true, // 循环模式选项
  //         // 如果需要分页器
  //         pagination: {
  //           el: '.swiper-pagination'
  //         }
  //       })
  //     }, 1000)
  //   }
  // }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>
