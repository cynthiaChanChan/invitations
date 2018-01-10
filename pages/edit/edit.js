const app = getApp()
const util = require('../../utils/util.js');
const imgData = require('../../data/data.js');
const saveUrl = "/KorjoApi/SaveInvitation";
const getUrl = "/korjoApi/GetInvitationInfo";
const domain = app.globalData.domain;
Page({
    data: {
        isCanvasShow: "block",//none
        result: {},
        isHintHidden: true,
        animation: "slideInDown",
        fontColors: imgData.fontColors,
        fontColorActiveIdx: "",
        buttonColorActiveIdx: "",
        buttonColors: imgData.buttonColors
    },
    onLoad: function(options) {
        //编辑旧请柬
        this.id = options.id;
        if (this.id) {
          this.getResultData(this.id);
          return;
        }
        //创建请柬
        const templateData = wx.getStorageSync("templateData");
        const that = this;
        const today = new Date();
        const beDate = `${today.getFullYear()}-${util.formatNumber(today.getMonth() + 1)}-${util.formatNumber(today.getDate())}`;
        let result = {
          templateData,
          title: ""
        }
        result.locationInfo = {
          name: "天河又一城",
          address: "广东省广州市天河区天河中心体育西路54号",
          latitude: 23.1324255,
          longitude: 113.3225692
        }
        result = that.getTime(result);
        that.getDate(result);
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
    getDate: function(result) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const beDate = String(year) + "-" + util.formatNumber(month) + "-" + util.formatNumber(day);
      result.duration.beDate = beDate;
      result.duration.enDate = beDate;
      this.setData({
          result,
          beStart: String(year) + "-01-01",
          beEnd: String(year + 1) + "-12-31",
          enStart: String(year) + "-01-01",
          enEnd: String(year + 1) + "-12-31"
      })
    },
    getTime: function(result) {
      const date = new Date();
      const hour = date.getHours() + 1;
      const beTime = util.formatNumber(hour) + ":00";
      const enTime = util.formatNumber(hour + 1) + ":00";
      result.duration = {beTime, enTime};
      return result;
    },
    chooseDuration: function(e) {
      const result = this.data.result;
      const type = e.currentTarget.dataset.type;
      result.duration[type] = e.detail.value;
      this.setData({result})
    },
    chooseLocation: function(e) {
        const that = this;
        const hintText = "将自动获取您的地理位置为活动地点\n您也可以通过点击地图右上方的搜索图标来修改";
        this.setData({
            isHintHidden: false,
            hintText
        })
        setTimeout(that.conformLocation, 1500);
    },
    conformLocation: function() {
      const that = this;
      const result = this.data.result;
      app.loading();
      wx.chooseLocation({
          success: function(res) {
              wx.hideToast();
              const locationInfo = {
                  name: res.name,
                  address: res.address,
                  latitude: res.latitude,
                  longitude: res.longitude
              }
              result.locationInfo = locationInfo;
              that.setData({
                  result,
                  isHintHidden: true
              })
          },
          complete: function(res) {
              wx.hideToast();
              if (res.errMsg.indexOf("cancel") > -1) {
              } else if (res.errMsg.indexOf("fail") > -1) {
                  //如果是定位失败
                  const hintText = "无法定位您当前的位置，请确认\n已经允许微信使用定位服务。检查方法如下：\n请到手机系统【设置】->【隐私】->【定位】\n服务中打开位置服务，并允许微信使用定位服务。"
                  that.setData({
                      isHintHidden: false,
                      hintText
                  })
              }
          }
      })
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
    chooseFontColor: function(e) {
        const index = e.currentTarget.dataset.index;
        const result = this.data.result;
        let fontColorActiveIdx = this.data.fontColorActiveIdx;
        const fontColors = this.data.fontColors;
        if (fontColors[fontColorActiveIdx]) {
          fontColors[fontColorActiveIdx].active = "";
        }
        fontColors[index].active = "active";
        fontColorActiveIdx = index;
        result.templateData.fontColor = fontColors[index].color;
        this.setData({result, fontColorActiveIdx, fontColors})
    },
    chooseButtonColor: function(e) {
        const index = e.currentTarget.dataset.index;
        const result = this.data.result;
        let buttonColorActiveIdx = this.data.buttonColorActiveIdx;
        const buttonColors = this.data.buttonColors;
        if (buttonColors[buttonColorActiveIdx]) {
          buttonColors[buttonColorActiveIdx].active = "";
        }
        buttonColors[index].active = "active";
        buttonColorActiveIdx = index;
        result.templateData.buttonColor = buttonColors[index].color;
        this.setData({result, buttonColorActiveIdx, buttonColors})
    },
    titleInput: function(e) {
        const result = this.data.result;
        result.title = e.detail.value;
        this.setData({result});
    },
    goRegistration: function(e) {
  	    wx.navigateTo({
  	  	    url: "../registration/registration"
  	    })
    },
    goCreate: function(e) {
      wx.navigateTo({
          url: "../create/create"
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
    },
    ShareImg: function() {
      this.uploadImg();
    },
    createShareImg: function(bgPath, data) {
        const that = this;
        const result = that.data.result;
        this.setData({
           isCanvasShow: "block"
        })
        const ctx = wx.createCanvasContext('shareImg');
        ctx.drawImage("../../images/envolope.jpg", 0, 0, that.windowWidth, that.data.canvasHeight);
        ctx.drawImage("../../images/post.png", that.windowWidth - 15 -60, 15, 60, 80);
        ctx.drawImage("../../images/3.png", that.windowWidth - 10 -60, 20, 50, 70);
        ctx.drawImage("../../images/postmark.png", 100 + 50, 32, 100, 50);
        ctx.setFillStyle('#ffffff');
        ctx.setFontSize(16);
        ctx.setTextAlign('center');
        ctx.setTextBaseline('middle')
        ctx.fillText(`开始时间：${result.duration.beDate} ${result.duration.beTime}`, that.windowWidth / 2, 110);
        ctx.fillText(`结束时间：${result.duration.enDate} ${result.duration.enTime}`, that.windowWidth / 2, 135);
        ctx.fillText(`举办地点：${result.locationInfo.name}`, that.windowWidth / 2, 160);
        ctx.draw();
        setTimeout(()=> {
          that.getShareImg(data, (shareImg) => {
              data.shareImg = shareImg;
              that.sendRequest(data);
              console.log(shareImg)
          })
        }, 100);

    },
    getShareImg: function(data, callback) {
        const that = this;
        wx.canvasToTempFilePath({
            canvasId: 'shareImg',
            success: function(res) {
                app.uploadBanner(res.tempFilePath, function(result) {
                  const shareImg = that.data.domain + result;
                  callback(shareImg);
                  console.log("success: ", shareImg)
                })
            },
            fail: function(res) {
                console.log("fail to create Canvas shareImg: ")
                callback(that.data.banner);
            }
        })
    },
    uploadImg: function() {
        const that = this;
        //canvas 宽度为图片宽，若canvas宽带小于图片会模糊
        that.windowWidth = 300;
        that.setData({
          windowWidth: that.windowWidth,
          canvasHeight: that.windowWidth * 0.71
        });
        //需要下载图片后drawImage, 否则手机做不成
        wx.downloadFile({
          url: that.data.result.templateData.img,
          success: function(response) {
            if (response.statusCode == 200) {
              const bgPath = response.tempFilePath;
              console.log("bgPath", bgPath);
              that.createShareImg(bgPath)
            }
          }
        })
    },
    save: function() {
      app.loading();
      const result = this.data.result;
      const jsonData = {
          title: result.title.trim(),
          locationInfo: result.locationInfo,
          duration: result.duration,
          templateData: result.templateData
      }
      app.getUser(()=> {
        this.saveData(jsonData);
      });
    },
    saveData: function(jsonData) {
        const that = this;
        const dataJson = {
            userid: wx.getStorageSync('invitationsUserInfo').openid,
            dataJson: JSON.stringify(jsonData)
        }
        if(that.id) {
          //修改请柬
          dataJson.id = that.id;
          wx.request({
               url: domain + saveUrl,
               data: {dataJson: JSON.stringify(dataJson)},
               method: 'POST',
               header: {
                   'content-type': 'application/x-www-form-urlencoded'
               },
               success: function(response) {
                   const result =  response.data;
                   wx.redirectTo({
                      url: "../invitation/invitation?id=" + that.id
                   })
               }
           });

        } else {
          //创建请柬
          wx.request({
              url: domain + saveUrl,
              data: {dataJson: JSON.stringify(dataJson)},
              method: 'POST',
              header: {
                  'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(response) {
                  const result =  response.data;
                  const id = JSON.parse(result.replace(/[()]/g,'')).data;
                  wx.redirectTo({
                      url: "../invitation/invitation?id=" + id
                  })
              }
          });
        }
    },
})
