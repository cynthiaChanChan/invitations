//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    domain: app.globalData.domain,
    choices: [{
      type: "活动邀请",
      idName: "show",
      bgColor: "#DA311A"
    }, {
      type: "派对饭局",
      idName: "party",
      bgColor: "#fb8736"
    }, {
      type: "商务会议",
      idName: "business",
      bgColor: "#757575"
    }, {
      type: "婚礼典礼",
      idName: "ceremony",
      bgColor: "#a8d06d"
    }, {
      type: "自定义",
      bgColor: "#33cbcc"
    }]
  },
  onLoad: function () {
    const choices = this.data.choices;
    let choosenIndex = 0;
    choices[choosenIndex].active = "active";
    const gallery = [];
    const types = ["show", "party", "business", "ceremony"];
    const url = "http://g.m.fans-me.com/invitationImg/bgs/"
    for(let type of types) {
      let bgs = [];
      for (let i = 1; i < 5; i += 1) {
        bgs.push(`${url}${type}/${i}.jpg`);
      }
      gallery.push({
        idName: type,
        bgs
      })
    }
    const choosenGallery = gallery[choosenIndex];
    this.setData({choices, choosenIndex, gallery, choosenGallery});

  },
  chooseType: function(e) {
    const index = e.currentTarget.dataset.index;
    const choices = this.data.choices;
    const gallery = this.data.gallery;
    let choosenIndex = this.data.choosenIndex;
    choices[choosenIndex].active = "";
    choices[index].active = "active";
    choosenIndex = index;
    const choosenGallery = gallery[choosenIndex];
    this.setData({choices, choosenIndex, choosenGallery});
  },
  goTemplate: function() {
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
