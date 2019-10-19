// 引入koa
let Koa = require('koa')
// 引入koa-router
let KoaRouter = require('koa-router')
// 实例化koa
let koa = new Koa()
// 实例化koa-router
let koaRouter = new KoaRouter()
// 引入datas数据
let datas = require('./datas/data.json')
var Fly = require('flyio/src/node/index.js')
var fly = new Fly 
// 定义接口返回数据
koaRouter.get('/', (ctx, next) => {
  // 获取调用接口传入的参数
  let req = ctx.query.req
  console.log(req)
  ctx.body = '返回啦'
})
koaRouter.get('/login', (ctx, next) => {
  // 获取调用接口传入的参数
  let req = ctx.query.req
  console.log(req)
  ctx.body = '登录成功啦'
})
koaRouter.get('/shops', (ctx, next) => {
  // 获取调用接口传入的参数
  let req = ctx.query.req
  console.log(req)
  ctx.body = [
    {
      name: '嘉和一品',
      score: 3.2
    },
    {
      name: '山西面馆',
      score: 4.5
    }, {
      name: '兰州拉面',
      score: 5
    }
  ]
})
koaRouter.get('/search', (ctx, next) => {
  let req = ctx.query.req
  console.log(req) // 输出参数
  ctx.body = datas
})
koaRouter.get('/getopenId', async (ctx, next) => {
  const code = ctx.query.code
  // 参数
  // console.log(code)
  // appId
  const appId = 'wx8dc92766a09575de'
  // secret
  const secret = '8cc9978fb559e68c8b37ae4b71ee2788'
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
  // 发送请求

  let body = await fly.get(url)
  // fly.get(url)
  //   .then(function (response) {
  //     body=response
  //   })
  //   .catch(function (error) {
  //     body=error
  //   })
  console.log(typeof body)
  body = JSON.parse(body.data)
  console.log(body.openid)
  ctx.body = body.openid
})
// 声明使用所有的路由及路由的相关的所有的方法
koa
  .use(koaRouter.routes())
  .use(koaRouter.allowedMethods())
// 监听端口,启动服务器
koa.listen('4000', () => {
  console.log('服务器启动了')
  console.log('服务器的地址为:http://localhost:4000')
})
