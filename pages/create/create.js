//index.js
//获取应用实例
const app = getApp();
const imgData = require('../../data/data.js');
Page({
  data: {
    domain: app.globalData.domain,
    choices: imgData.choices
  },
  onLoad: function () {
    const choices = this.data.choices;
    let choosenIndex = 0;
    choices[choosenIndex].active = "active";
    const choosenGallery = choices[choosenIndex];
    this.setData({choices, choosenIndex, choosenGallery});

  },
  chooseType: function(e) {
    const index = e.currentTarget.dataset.index;
    const choices = this.data.choices;
    let choosenIndex = this.data.choosenIndex;
    choices[choosenIndex].active = "";
    choices[index].active = "active";
    choosenIndex = index;
    const choosenGallery = choices[choosenIndex];
    this.setData({choices, choosenIndex, choosenGallery});
  },
  goTemplate: function(e) {
    const index = e.currentTarget.dataset.index;
    const choosenGallery = this.data.choosenGallery;
    wx.setStorageSync("templateData",choosenGallery.bgs[index]);
    wx.navigateTo({
			url: "../template/template"
		})
  },
  previewImg: function(e) {
    const index = e.currentTarget.dataset.index;
    const choosenGallery = this.data.choosenGallery;
    wx.previewImage({
      current: choosenGallery.bgs[index], // 当前显示图片的http链接
      urls: [choosenGallery.bgs[index]] // 需要预览的图片http链接列表
    })
  }
})
