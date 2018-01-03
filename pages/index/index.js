//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    wx.redirectTo({
      url: "../create/create"
    })
  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  }
})
