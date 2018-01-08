const app = getApp()
const commonFun = require('../../utils/util.js');
Page({
    data: {

    },
    onLoad: function(options) {
      const templateData = wx.getStorageSync("templateData");
      const result = {
        templateData
      }
      this.setData({result});
    }
})
