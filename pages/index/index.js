const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    // wx.reLaunch({
    //   url: "../create/create?id=72&update=true"
    // })
  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  },
  goTimeline: function () {
    wx.navigateTo({
			url: "../timeline/timeline"
		})
  }
})
