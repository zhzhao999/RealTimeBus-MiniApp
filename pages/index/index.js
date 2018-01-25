//list.js
var api = require('../../utils/api.js')

Page({
  data: {
    lists: {}
  },
  onLoad () {
    var that = this
    api.get(`${api.URL}/bus/test`)
      .then(res => {
        console.log(res)
      })
    
    api.post(`${api.URL}/bus/findAll`, {
      type: 'night'
    }).then(res => {
      /*that.setData({
        lists: res.datas
      })*/
      console.log(lists)
    })
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})