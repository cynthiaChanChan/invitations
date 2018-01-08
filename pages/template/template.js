const app = getApp()
const util = require('../../utils/util.js');
Page({
    data: {
        result: {}
    },
    onLoad: function(options) {
        this.id = options.id;
        const templateData = wx.getStorageSync("templateData");
        const that = this;
        const today = new Date();
        const beDate = `${today.getFullYear()}-${util.formatNumber(today.getMonth() + 1)}-${util.formatNumber(today.getDate())}`;
        const result = {
          templateData,
          title: "活动名称",
          duration: {
            beDate,
            beTime: "19:00",
            enDate: beDate,
            enTime: "22:00"
          }
        }
        that.getLocationInfo(result);
    },
    getLocationInfo: function(result) {
      const that = this;
      result.locationInfo = {
        name: "天河又一城",
        address: "广东省广州市天河区天河中心体育西路54号",
        latitude: 23.1324255,
        longitude: 113.3225692
      }
      that.setData({result});
    },
    goRegistration: function(e) {
  	    wx.navigateTo({
  	  	    url: "../registration/registration",
  	    })
    },
    goCreate: function(e) {
  	    wx.navigateTo({
  	  	    url: "../create/create",
  	    })
    },
    goEdit: function(e) {
  	    wx.navigateTo({
  	  	    url: "../edit/edit",
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
