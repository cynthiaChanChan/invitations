//app.js
const apiUrl = 'https://korjo.fans-me.com/KorjoApi/GetSessionKey';
App({
  getUser: function (callback) {
        if (!wx.getStorageSync('invitaionsUserInfo')) {
            wx.login({
                success: function(res) {
                    console.log(res.code);
                    const code = res.code;
                    if (code) {
                        wx.request({
                            url: apiUrl,
                            data: {id: 23, js_code: code},//23
                            dataType: "json",
                            header: {
                               'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: function(response) {
                               const result = JSON.parse(response.data);
                               wx.setStorageSync('invitationsUserInfo', result);
                               callback();
                            }
                        });
                    }
                }
            });
        } else {
            callback()
        }
  },
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
