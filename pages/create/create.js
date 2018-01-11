//index.js
//获取应用实例
const app = getApp();
const imgData = require('../../data/data.js');
Page({
  data: {
    domain: app.globalData.domain,
    choices: imgData.choices
  },
  onLoad: function (options) {
    const choices = this.data.choices;
    this.id = options.id;
    this.update = options.update;
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
  navigateToTemplate: function() {
    let url = "../template/template";
    if (this.id) {
      url += "?id=" + this.id + "&update=" + this.update;
    }
    wx.navigateTo({url});
  },
  goTemplate: function(e) {
    const index = e.currentTarget.dataset.index;
    const choosenGallery = this.data.choosenGallery;
    let templateData =  choosenGallery.bgs[index];
    if (this.update) {
      //更新旧请柬, 只更新图，颜色不变
      templateData = wx.getStorageSync('templateData');
      templateData.img = choosenGallery.bgs[index].img;
    }
    wx.setStorageSync("templateData",templateData);
    this.navigateToTemplate();
  },
  upLoadImg: function() {
    app.chooseImage((res) => {
      console.log("用户上传背景图：", res);
      wx.setStorageSync("templateData", {
          img: res[0],
          fontColor: "#000",
          buttonColor: "#ee1b44"
      });
      this.navigateToTemplate();
    })
  },
  previewImg: function(e) {
    const index = e.currentTarget.dataset.index;
    const choosenGallery = this.data.choosenGallery;
    console.log("choosenGallery: ", choosenGallery.bgs[index]);
    wx.previewImage({
      current: choosenGallery.bgs[index].img, // 当前显示图片的http链接
      urls: [choosenGallery.bgs[index].img] // 需要预览的图片http链接列表
    })
  }
})
