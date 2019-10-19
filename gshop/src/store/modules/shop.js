
// 引入mutation-types
import { RECEIVE_GOODS, RECEIVE_RATINGS, RECEIVE_INFO, ADD_FOOD_COUNT, REDUCE_FOOD_COUNT } from '../mutation-types.js'
// 引入api
import { reqGoods, reqRatings, reqInfo } from '../../api'
import Vue from 'vue'
const state = {

  // 点餐信息
  goods: [],
  // 评价信息
  ratings: [],
  // 商家信息
  info: {},
  // 用来存储购物车中的食物的
  cartFoods: []
}
const mutations = {

  // 更新点餐信息
  [RECEIVE_GOODS](state, { goods }) {
    state.goods = goods
  },
  // 更新评价信息
  [RECEIVE_RATINGS](state, { ratings }) {
    state.ratings = ratings
  },
  // 更新商家信息
  [RECEIVE_INFO](state, { info }) {
    state.info = info
  },
  // 增加食物
  [ADD_FOOD_COUNT](state, { food }) {
    // 判断
    if (!food.count) {
      //向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
      // food.count = 1
      Vue.set(food, 'count', 1)
      // 添加食物
      state.cartFoods.push(food)

    } else {
      food.count++
    }
  },

  // 减少食物
  [REDUCE_FOOD_COUNT](state, { food }) {
    // 如果食物的数量大于0再减少
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
}
const actions = {
  // 获取点餐信息
  async getGoods({ commit }) {
    const result = await reqGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
    }
  },
  // 获取评价信息
  async getRatings({ commit }) {
    const result = await reqRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
    }
  },

  // 获取商家信息
  async getInfo({ commit }) {
    const result = await reqInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 食物的数量操作
  updateFoodCount({ commit }, { isAdd, food }) {
    // 判断
    if (isAdd) {
      // 增加
      commit(ADD_FOOD_COUNT, { food })
    } else {
      // 减少
      commit(REDUCE_FOOD_COUNT, { food })
    }
  },
  xxx(){
    // console.log('今天天气好晴朗shop')
  }
}
const getters = {

  // 计算总数量
  totalCount(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },

  // 计算总价格
  totalPrice(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },
    /*
  总商家评论数
   */
  totalRatingsCount (state) {
    return state.ratings.length
  },

  /*
  总商家推荐评论数
   */
  positiveRatingsCount (state) {
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType===0 ? 1 : 0), 0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}