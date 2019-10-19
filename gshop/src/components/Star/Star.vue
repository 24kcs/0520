<template>
  <div class="star" :class="`star-`+size">
    <span class="star-item" :class="cls" v-for="(cls,index) in scoreClassArr" :key="index"></span>
  </div>
</template>
<script>
export default {
  // 接收传过来的数据
  props: {
    score: Number,
    size: String
  },
  name: 'Star',
  computed: {
    scoreClassArr() {
      const { score } = this
      let classArr = []
      // 3.8
      let scoreInt = Math.floor(score)
      // 循环遍历添加on
      for (let i = 0; i < scoreInt; i++) {
        classArr.push('on')
      }
      // 半颗星星 4.7-4=0.7
      if (score * 10 - scoreInt * 10 >= 5) {
        classArr.push('half')
      }
      //2.1
      // if(classArr.length<5){

      // }
      while(classArr.length<5){
        classArr.push('off')
      }
      return classArr
    }
  }
  /**
   * 5个span---动态的遍历输出来,class也是动态的(on,half,off)
   * 数组:存储个数---5个,数组中存储的应该是类样式的名字
   * 4.7
   * 4个黄色的星星  4个on
   * 半个星星有一个 一个half
   * 2.6
   * 2on
   * 1half
   * 2off
   *
   *
   */
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')
</style>
