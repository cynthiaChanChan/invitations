//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    wx.reLaunch({
      url: "../submit/submit?id=72"
    })
  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  }
})
