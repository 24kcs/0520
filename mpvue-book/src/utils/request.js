// 引入config
import config from './config.js'
function request (url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      success: function (res) {
        // 成功后获取的数据
        resolve(res.data)
      },
      fail: function (error) {
        reject(error.Message)
      }
    })
  })
}
export default request
