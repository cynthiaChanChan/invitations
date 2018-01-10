const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    wx.reLaunch({
      url: "../create/create"
    })
    // wx.reLaunch({
    //   url: "../edit/edit?id=72"
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
