//app.js
const domain = "https://www.korjo.cn";
const apiUrl = '/KorjoApi/GetSessionKey';
App({
  getUser: function (callback) {
        if (!wx.getStorageSync('invitationsUserInfo')) {
            wx.login({
                success: function(res) {
                    console.log(res.code);
                    const code = res.code;
                    if (code) {
                        wx.request({
                            url: domain + apiUrl,
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
            callback();
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
  navigateBack: () => {
    wx.navigateBack({
      delta: 1
    })
  },
  chooseImage: function(callback) {
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
          // 返回选定照片的本地文件路径列表
              var tempFilePaths = res.tempFilePaths;
              callback(tempFilePaths);
          }
      })
  },
  uploadBanner: function(img, callback) {
      wx.uploadFile({
          url: `${domain}/KorjoApi/AdminUpload`,
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
    domain: domain
  }
})
