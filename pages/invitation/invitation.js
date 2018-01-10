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
    share: function() {

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
