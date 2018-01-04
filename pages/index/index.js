//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    wx.reLaunch({
      url: "../edit/edit"
    })
  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  }
})
