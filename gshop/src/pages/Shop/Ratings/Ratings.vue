<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <div>
              <Star :score="info.serviceScore" size="36"></Star>
            </div>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <div>
              <Star :score="info.foodScore" size="36"></Star>
            </div>
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split" style="pointer-events: none;"></div>
      <div>
        <RatingsFilter :onlyText="onlyText" :selectType="selectType" />
      </div>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <div>
                  <Star :score="rating.score" size="24"></Star>
                </div>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span
                  class="iconfont icon-thumb_up"
                  :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"
                ></span>
              </div>
              <div class="time">{{rating.rateTime | date-format}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex
import { mapState } from "vuex";
// 引入RatingsFilter
import RatingsFilter from "./RatingsFilter.vue";
// 滑动
import BScroll from "better-scroll";
export default {
  data() {
    return {
      onlyText: true, //  是否显示内容
      selectType: 1 // 0--推荐    1---全部  2---吐槽
    };
  },
  components: {
    RatingsFilter
  },
  async mounted() {
    // 提交获取ratings数据
    await this.$store.dispatch("getRatings");
    let scroll = new BScroll(".ratings", {
      click: true
    });

    // 绑定自定义监听
    this.$bus.$on("setSelectType", this.setSelectType);
    this.$bus.$on("toggleOnlyText", this.toggleOnlyText);
  },
  computed: {
    ...mapState({
      ratings: state => state.shop.ratings,
      info: state => state.shop.info
    }),

    // 过滤后的数组
    filterRatings() {
      // 取出相关数据
      const { ratings, onlyText, selectType } = this;
      // 计算产生结果数据, 并返回
      return ratings.filter(rating => {
        const { rateType, text } = rating;
        return (
         
          (selectType === 2 || selectType === rateType) &&
          (!onlyText || text.length > 0)
          // 如果onlyText为true显示的就是有评论的内容,如果为false则看到的就是全部
        );
      });
    }
  },
  methods: {
    setSelectType(type) {
      this.selectType = type;// 0 1 2
      console.log(this.selectType);
    },
    toggleOnlyText() {
      console.log("执行啦");
      this.onlyText = !this.onlyText;  // true  false
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixins.styl'
.ratings
  position absolute
  top 225px
  bottom 0
  left 0
  width 100%
  overflow hidden
  background #fff
  .overview
    display flex
    padding 18px 0
    .overview-left
      flex 0 0 137px
      padding 6px 0
      width 137px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      text-align center
      @media only screen and (max-width: 320px)
        flex 0 0 120px
        width 120px
      .score
        margin-bottom 6px
        line-height 28px
        font-size 24px
        color rgb(255, 153, 0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7, 17, 27)
      .rank
        line-height 10px
        font-size 10px
        color rgb(147, 153, 159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left 6px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          display inline-block
          line-height 18px
          vertical-align top
          font-size 12px
          color rgb(7, 17, 27)
        .star
          display inline-block
          margin 0 12px
          vertical-align top
        .score
          display inline-block
          line-height 18px
          vertical-align top
          font-size 12px
          color rgb(255, 153, 0)
      .delivery-wrapper
        font-size 0
        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .delivery
          margin-left 12px
          font-size 12px
          color rgb(147, 153, 159)
  .split
    width 100%
    height 16px
    border-top 1px solid rgba(7, 17, 27, 0.1)
    border-bottom 1px solid rgba(7, 17, 27, 0.1)
    background #f3f5f7
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      bottom-border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7, 17, 27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
        .text
          margin-bottom 8px
          line-height 18px
          color rgb(7, 17, 27)
          font-size 12px
        .recommend
          line-height 16px
          font-size 0
          .icon-thumb_up, .icon-thumb_down, .item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .icon-thumb_up
            color $yellow
          .icon-thumb_down
            color rgb(147, 153, 159)
          .item
            padding 0 6px
            border 1px solid rgba(7, 17, 27, 0.1)
            border-radius 1px
            color rgb(147, 153, 159)
            background #fff
        .time
          position absolute
          top 0
          right 0
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
</style>

