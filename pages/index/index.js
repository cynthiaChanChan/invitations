const app = getApp()

Page({
  data: {
  },
  onLoad: function() {

  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  },
  showDesc: function() {
    wx.navigateTo({
			url: "../intro/intro"
		})
  },
  goTimeline: function () {
    wx.navigateTo({
			url: "../timeline/timeline"
		})
  }
})
