const app = getApp()
const commonFun = require('../../utils/util.js');
Page({
    data: {
      animation: "slideInDown",
      isHintHidden: true
    },
    onLoad: function(options) {
      const templateData = wx.getStorageSync("templateData");
      const result = {
        templateData
      }
      this.setData({result});
    },
    switch: function() {
       this.setData({
         animation: "slideOutUp"
       })
    },
    goEdit: function(e) {
        // let url = "../edit/edit";
        // if (this.id) {
        //   url += "?id=" + this.id + "&update=" + this.update;
        // }
  	    // wx.redirectTo({url});
        app.navigateBack();
    },
    open: function() {
       this.setData({
         animation: "slideInDown fast"
       })
    },
    goCreate: function(e) {
  	    wx.navigateBack({
          delta: 2
        })
    },
    hideHint: function() {
        this.setData({
            isHintHidden: true
        })
    },
    save: function(e) {
      this.setData({
        hintText: "案例无法报名",
        isHintHidden: false
      })
      setTimeout(this.hideHint, 1500);
    }
})
