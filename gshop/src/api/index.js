// 引入ajax
import ajax from './ajax.js'
// http://localhost:5000/position/40.10038,116.36867
const BASE = '/api'
// 获取地址信息
export const reqAddress = (longitude, latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)
// 获取食品分类信息----需要携带token
export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + `/index_category`,
  // headers:{
  //   // 标识:作用:需要携带token
  //   needToken:true
  // }
})
// 获取商铺信息
export const reqShops = ({ longitude, latitude }) => ajax({
  method: 'GET',
  url: BASE + `/shops`,
  params: {
    longitude,
    latitude
  }
})
// 发送短信验证码
export const reqSendCode=(phone)=>ajax({
  method:'GET',
  url:BASE+`/sendcode`,
  params:{
    phone
  }
})
// 手机和验证码登录
export const reqSmsLogin=(phone,code)=>ajax({
  method:'POST',
  url:BASE+`/login_sms`,
  data:{
    phone,
    code
  }
})
// 用户名和密码和图形验证码
export const reqPwdLogin=({name,pwd,captcha})=>ajax({
  method:'POST',
  url:BASE+`/login_pwd`,
  data:{
    name,
    pwd,
    captcha
  }
})
// 自动登录的接口---需要携带token
export const reqAutoLogin=()=>ajax({
  method:'GET',
  url:BASE+`/auto_login`, 
  headers:{
    // 标识:作用:需要携带token
    needToken:true
  }
})


// 点餐的接口
export const reqGoods=()=>ajax('/goods')
// 评价的接口
export const reqRatings=()=>ajax('/ratings')
// 商家的接口
export const reqInfo=()=>ajax('/info')