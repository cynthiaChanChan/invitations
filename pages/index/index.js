const app = getApp()

Page({
  data: {

  },
  onLoad: function() {
    // wx.reLaunch({
    //   url: "../registration/registration"
    // })
    // wx.reLaunch({
    //   url: "../edit/edit?id=72"
    // })
  },
  goCreate: function () {
    wx.navigateTo({
			url: "../create/create"
		})
  }
})
