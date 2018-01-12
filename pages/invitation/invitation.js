const app = getApp()
const util = require('../../utils/util.js');
const getUrl = "/korjoApi/GetInvitationInfo";
const domain = app.globalData.domain;
Page({
    data: {
        result: {},
        animation: "slideInDown"
    },
    onLoad: function(options) {
        this.id = options.id;
        this.getResultData(this.id);
        if (options.share) {
          this.setData({
            isHide: true
          })
        }
    },
    getResultData: function(id) {
       const that = this;
       app.loading();
       util.getRequest(domain + getUrl, {id}, function(response) {
         app.hideLoading();
         const result = JSON.parse(response.data.datajson);
         that.setData({result})
       });
    },
    onShareAppMessage: function(res) {
        const that = this;
        return {
            title: "邀您参与" + that.data.result.title,
            path: "/pages/invitation/invitation?id=" + that.id + "&share=true",
            imageUrl: that.data.result.shareImg || "../../images/share.jpg",
            success: function(res) {
            },
            fail: function(res) {
            // 转发失败
            }
        }
    },
    switch: function() {
       this.setData({
         animation: "slideOutUp"
       })
    },
    open: function() {
       this.setData({
         animation: "slideInDown fast"
       })
    },
    goRegistration: function(e) {
  	    wx.navigateTo({
  	  	    url: "../submit/submit?id=" + this.id,
  	    })
    },
    goEdit: function(e) {
  	    wx.navigateTo({
  	  	    url: "../edit/edit?id=" + this.id,
  	    })
    },
    //地图
    openLocation: function(e) {
        const that = this;
        const locationInfo = that.data.result.locationInfo;
        wx.openLocation({
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            scale: 16,
            name: locationInfo.name,
            address: locationInfo.address
        })
    }
})
