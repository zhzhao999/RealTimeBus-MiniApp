//list.js
var api = require('../../utils/api.js')

Page({
  data: {
    name: null,
    lists: {},
    loading: true,
    tip: null
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
    })
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})