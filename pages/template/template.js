const app = getApp()
const util = require('../../utils/util.js');
Page({
    data: {
        result: {}
    },
    onLoad: function(options) {
        this.id = options.id;
        this.update = options.update;
        const templateData = wx.getStorageSync("templateData");
        const that = this;
        const invitationData = wx.getStorageSync("invitationData") || {};
        const today = new Date();
        const beDate = `${today.getFullYear()}-${util.formatNumber(today.getMonth() + 1)}-${util.formatNumber(today.getDate())}`;
        const duration = invitationData.duration || {
          beDate,
          beTime: "19:00",
          enDate: beDate,
          enTime: "22:00"
        }
        const result = {
          templateData,
          title: invitationData.title || "活动名称",
          duration,
          locationInfo: invitationData.locationInfo
        }
        that.getLocationInfo(result);
    },
    getLocationInfo: function(result) {
      const that = this;
      //如缓存无地址，则默认
      if (!result.locationInfo) {
        result.locationInfo = {
          name: "天河又一城",
          address: "广东省广州市天河区天河中心体育西路54号",
          latitude: 23.1324255,
          longitude: 113.3225692
        }
      }
      that.setData({result});
    },
    goRegistration: function(e) {
  	    wx.navigateTo({
  	  	    url: "../registration/registration",
  	    })
    },
    goCreate: function(e) {
  	    app.navigateBack();
    },
    goEdit: function(e) {
        let url = "../edit/edit";
        if (this.id) {
          url += "?id=" + this.id + "&update=" + this.update;
        }
  	    wx.navigateTo({url})
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
