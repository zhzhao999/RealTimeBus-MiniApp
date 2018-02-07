//detail.js
var api = require('../../utils/api.js')

Page({
  data: {
    key: null,
    left: {},
    right: {}
  },
  onLoad (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.key+'路'
    })
    this.setData({
      key: options.key
    })

    api.post(`${api.URL}/bus/getLineDir`, {
      lineId: options.key
    }).then(res => {
      for(var i = 0; i < res.datas.length; i++) {
        var list = res.datas[i]
        var resName = list.name
        var name = resName.substring(resName.indexOf("(")+1,resName.indexOf(")"))
        list.name = name

        if(i == 0) {
          that.setData({
            left: list
          })
        }else{
          that.setData({
            right: list
          })
        }

      }
    })

    console.log(this.data.left)

  }
})