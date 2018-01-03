//app.js
App({
  loading: function() {
      if (wx.showLoading) {
          wx.showLoading({
              title: '加载中',
              mask: true
          })
      } else {
          wx.showToast({
             title: "加载中",
             icon: "loading",
             mask: true,
             duration: 100000
          });
      }
  },
  hideLoading: function() {
      if (wx.showLoading) {
          wx.hideLoading();
      } else {
          wx.hideToast()
      }
  },
  uploadBanner: function(img, callback) {
      wx.uploadFile({
          url: 'https://korjo.fans-me.com/KorjoApi/AdminUpload',
          filePath: img,
          name: 'file',
          formData: {
              path: "korjo",
              type: "image"
          },
          success: function(res) {
              callback(res.data);
          }
      })
  },
  globalData: {
    domain: "https://korjo.fans-me.com"
  }
})
