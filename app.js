//app.js
var api = require('./utils/api.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) //将登陆时间缓存

    // 登录
    var that = this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          api.post(`${api.URL}/bus/user/login`, {
            code: res.code
          }).then(res => {
            wx.setStorageSync('id', res.data.datas.id)
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              var id = wx.getStorageSync('id')
              
              api.post(`${api.URL}/bus/user/update`, {
                id: id,
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl,
                gender: res.userInfo.gender,
                city: res.userInfo.city,
                province: res.userInfo.province,
                country: res.userInfo.country,
                language: res.userInfo.language
              })
              
            }
          })
        }
      }
    })
  }
})