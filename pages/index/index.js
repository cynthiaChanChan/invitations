const app = getApp()

Page({
  data: {
    isHintHidden: true
  },
  onLoad: function() {
    // wx.reLaunch({
    //   url: "../submit/submit?id=80"
    // })
  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  },
  showDesc: function() {
    this.setData({
      isHintHidden: false
    })
  },
  hideHint: function() {
      this.setData({
          isHintHidden: true
      })
  },
  goTimeline: function () {
    wx.navigateTo({
			url: "../timeline/timeline"
		})
  }
})
