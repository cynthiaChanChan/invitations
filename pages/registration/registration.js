const app = getApp()
const commonFun = require('../../utils/util.js');
Page({
    data: {

    },
    onLoad: function(options) {
      const result = {
        bgImg: options.img
      }
      this.setData({result});
    }
})
