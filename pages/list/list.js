//list.js
var api = require('../../utils/api.js')

Page({
  data: {
    name: null,
    lists: {},
    loading: true,
    tip: null
  },
  onLoad () {
    const that = this
    api.get(`${api.URL}/bus/test`)
      .then(res => {
        console.log(res)
      })
    
    /*api.post(`${api.URL}/bus/findAll`, {
      type: ''
    }).then(res => {
      that.setData({
        lists: res.datas
      })
      console.log(lists)
    })*/
  },
  setname (e) {
    this.setData({
      name: e.detail.value
    })
  },
  btnClick () {
    const that = this;
    that.setData({
      loading: false
    })
    api.post(`${api.URL}/bus/findListByName`, {
      type: '',
      name: that.data.name
    }).then(res => {
      that.setData({
        lists: res.datas,
        loading: true
      })
      console.log(lists)
    })
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})