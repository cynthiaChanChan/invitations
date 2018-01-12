const app = getApp()
const util = require('../../utils/util.js');
const imgData = require('../../data/data.js');
const saveUrl = "/KorjoApi/SaveInvitation";
const getUrl = "/korjoApi/GetInvitationInfo";
const domain = app.globalData.domain;
Page({
    data: {
        isCanvasShow: "none",//none
        result: {},
        isHintHidden: true,
        animation: "slideInDown",
        fontColors: imgData.fontColors,
        fontColorActiveIdx: "",
        buttonColorActiveIdx: "",
        buttonColors: imgData.buttonColors
    },
    onLoad: function(options) {
        this.id = options.id;
        this.update = options.update;
        if (this.id) {
          //编辑旧请柬
          this.getResultData(this.id);
          return;
        }
        //创建请柬
        const templateData = wx.getStorageSync("templateData");
        const invitationData = this.getStoredData();
        const that = this;
        let result = {
          templateData,
          title: invitationData.title
        }
        result.locationInfo = invitationData.locationInfo || {
          name: "天河又一城",
          address: "广东省广州市天河区天河中心体育西路54号",
          latitude: 23.1324255,
          longitude: 113.3225692
        }
        result = that.getTime(result);
        result = that.getDate(result);
        that.highLight(result);
    },
    getResultData: function(id) {
       const that = this;
       let result = {};
       //如果是修改背景图
       if (this.update) {
         const invitationData = wx.getStorageSync("invitationData");
         result = {
           templateData: wx.getStorageSync("templateData"),
           title: invitationData.title,
           locationInfo: invitationData.locationInfo,
           duration: invitationData.duration
         }
         that.highLight(result);
       } else {
         //如果是修改其他
         app.loading();
         util.getRequest(domain + getUrl, {id}, function(response) {
           app.hideLoading();
           result = JSON.parse(response.data.datajson);
           that.setStoredData({
             title: result.title,
             locationInfo: result.locationInfo,
             duration: result.duration
           });
           wx.setStorageSync("templateData", result.templateData);
           that.highLight(result);
         });
       }
    },
    getStoredData: function() {
       return wx.getStorageSync("invitationData") || {};
    },
    setStoredData: function(invitationData) {
       wx.setStorageSync("invitationData", invitationData);
    },
    getDate: function(result) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const beDate = String(year) + "-" + util.formatNumber(month) + "-" + util.formatNumber(day);
      result.duration.beDate = beDate;
      result.duration.enDate = beDate;
      console.log("beStart", String(year) + "-01-01");
      this.setData({
          beStart: String(year) + "-01-01",
          beEnd: String(year + 1) + "-12-31",
          enStart: String(year) + "-01-01",
          enEnd: String(year + 1) + "-12-31"
      })
      return result;
    },
    getTime: function(result) {
      const date = new Date();
      const hour = date.getHours() + 1;
      const beTime = util.formatNumber(hour) + ":00";
      const enTime = util.formatNumber(hour + 1) + ":00";
      result.duration = {beTime, enTime};
      return result;
    },
    highLight: function(result) {
      //highlight 字体颜色与按钮颜色
      const fontColors = this.data.fontColors;
      const buttonColors = this.data.buttonColors;
      let fontColorActiveIdx = "";
      let buttonColorActiveIdx = "";
      for (let i = 0, max = fontColors.length; i < max; i += 1) {
        if (fontColors[i].color == result.templateData.fontColor) {
          console.log("字体颜色是：", fontColors[i].color);
          fontColors[i].active = "active";
          fontColorActiveIdx = i;
        }
      }
      for (let ii = 0, max = buttonColors.length; ii < max; ii += 1) {
        if (buttonColors[ii].color == result.templateData.buttonColor) {
          console.log("按钮颜色是：", buttonColors[ii].color);
          buttonColors[ii].active = "active";
          buttonColorActiveIdx = ii;
        }
      }
      this.setData({
        result,
        fontColors,
        buttonColors,
        fontColorActiveIdx,
        buttonColorActiveIdx
      })
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
      const invitationData = this.getStoredData();
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
              //缓存用户填的数据
              invitationData.locationInfo = locationInfo;
              that.setStoredData(invitationData);
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
        const templateData = wx.getStorageSync("templateData");
        let fontColorActiveIdx = this.data.fontColorActiveIdx;
        const fontColors = this.data.fontColors;
        if (fontColors[fontColorActiveIdx]) {
          fontColors[fontColorActiveIdx].active = "";
        }
        fontColors[index].active = "active";
        fontColorActiveIdx = index;
        result.templateData.fontColor = fontColors[index].color;
        //缓存用户填的数据
        templateData.fontColor = fontColors[index].color;
        wx.setStorageSync("templateData", templateData);
        this.setData({result, fontColorActiveIdx, fontColors})
    },
    chooseButtonColor: function(e) {
        const index = e.currentTarget.dataset.index;
        const result = this.data.result;
        const templateData = wx.getStorageSync("templateData");
        let buttonColorActiveIdx = this.data.buttonColorActiveIdx;
        const buttonColors = this.data.buttonColors;
        if (buttonColors[buttonColorActiveIdx]) {
          buttonColors[buttonColorActiveIdx].active = "";
        }
        buttonColors[index].active = "active";
        buttonColorActiveIdx = index;
        result.templateData.buttonColor = buttonColors[index].color;
        templateData.buttonColor = buttonColors[index].color;
        wx.setStorageSync("templateData", templateData);
        this.setData({result, buttonColorActiveIdx, buttonColors})
    },
    titleInput: function(e) {
        const result = this.data.result;
        const invitationData = this.getStoredData();
        result.title = e.detail.value;
        invitationData.title = e.detail.value;
        this.setStoredData(invitationData);
        this.setData({result});
    },
    goRegistration: function(e) {
  	    wx.navigateTo({
  	  	    url: "../registration/registration"
  	    })
    },
    goCreate: function(e) {
      let url = "../create/create";
      if(this.id) {
        url += "?id=" + this.id + "&update=true";
      }
      wx.navigateTo({url});
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
    showHint: function(hintText) {
        this.setData({
            isHintHidden: false,
            hintText: hintText
        })
        setTimeout(this.hideHint, 1500);
    },
    hideHint: function() {
        this.setData({
            isHintHidden: true
        })
    },
    checkIsActive: function() {
        const address = this.data.result.locationInfo ? this.data.result.locationInfo.address : "";
        const title = this.data.result.title;
        if (!address || !title) {
            if (!title) {
                this.showHint("活动名称未填写")
            } else if (!address) {
                this.showHint("活动地点未提供")
            }
            return false;
        } else {
            return true;
        }
    },
    ShareImg: function() {
      // 是否满足提交条件
      if (!this.checkIsActive()) {
         return;
      }
      //时间是否可以
      const duration = this.data.result.duration;
      const beginTime = util.formatDate(`${duration.beDate} ${duration.beTime}:00`);
      const endTime = util.formatDate(`${duration.enDate} ${duration.enTime}:00`);
      const now = new Date().getTime();
      if (now > endTime.getTime()) {
          const hintText = "结束时间需大于当前时间";
          this.setData({
              isHintHidden: false,
              hintText
          })
          setTimeout(this.hideHint, 1500);
          return;
      }
      if (beginTime.getTime() > endTime.getTime()) {
          const hintText = "开始时间需小于结束时间";
          this.setData({
              isHintHidden: false,
              hintText
          })
          setTimeout(this.hideHint, 1500);
          return;
      }
      this.uploadImg();
    },
    createShareImg: function(bgPath) {
        const that = this;
        const result = that.data.result;
        this.setData({
           isCanvasShow: "block"
        })
        const ctx = wx.createCanvasContext('shareImg');
        const envolopeHeight = that.windowWidth * 0.71;
        ctx.drawImage("../../images/envolope.jpg", 0, 0, that.windowWidth, that.data.canvasHeight);
        ctx.drawImage("../../images/post.png", that.windowWidth - 25 -80, 25, 80, 110);
        ctx.drawImage(bgPath, that.windowWidth - 15 -80, 35, 60, 90);
        ctx.drawImage("../../images/postmark.png", that.windowWidth -200, 55, 120, 60);
        ctx.setFillStyle('#ffffff');
        ctx.setFontSize(18);
        ctx.fillText(`开始时间：${result.duration.beDate} ${result.duration.beTime}`, 80, 170);
        ctx.fillText(`结束时间：${result.duration.enDate} ${result.duration.enTime}`, 80, 200);
        ctx.fillText(`举办地点：${result.locationInfo.name}`, 80, 230);
        ctx.draw();
        setTimeout(()=> {
          that.getShareImg(result, (shareImg) => {
              result.shareImg = shareImg;
              that.save(result);
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
                  const shareImg = domain + result;
                  callback(shareImg);
                  console.log("success: ", shareImg)
                })
            },
            fail: function(res) {
                console.log("fail to create Canvas shareImg: ")
                callback("");
            }
        })
    },
    uploadImg: function() {
        app.loading();
        const that = this;
        const img = that.data.result.templateData.img;
        //canvas 宽度为图片宽，若canvas宽带小于图片会模糊
        that.windowWidth = 400;
        that.setData({
          windowWidth: that.windowWidth,
          canvasHeight: that.windowWidth * 4 / 5
        });
        //需要下载图片后drawImage, 否则手机做不成
        if (img.indexOf("korjo") > -1) {
          wx.downloadFile({
            url: img,
            success: function(response) {
              if (response.statusCode == 200) {
                const bgPath = response.tempFilePath;
                console.log("bgPath", bgPath);
                that.createShareImg(bgPath)
              }
            }
          })
        } else {
          that.createShareImg(img);
        }
    },
    save: function(result) {
      const that = this;
      const jsonData = {
          title: result.title.trim(),
          locationInfo: result.locationInfo,
          duration: result.duration,
          templateData: result.templateData,
          shareImg: result.shareImg
      }
      if (result.templateData.img.indexOf("korjo") > -1) {
        console.log("无需上传背景图")
        app.getUser(()=> {
          that.saveData(jsonData);
        });
      } else {
        //如果是临时路径，需先上传图片
        app.uploadBanner(result.templateData.img, (path) => {
          jsonData.templateData.img = domain + path;
          console.log("upLoad BgImg:", path);
          app.getUser(()=> {
            that.saveData(jsonData);
          });
        })
      }
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
    }
})
