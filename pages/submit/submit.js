const app = getApp()
const util = require('../../utils/util.js');
const getUrl = "/korjoApi/GetInvitationInfo";
const domain = app.globalData.domain;
Page({
    data: {
      isHintHidden: true
    },
    onLoad: function(options) {
      this.id = options.id;
      this.submitData = wx.getStorageSync("submitData") || {};
      this.setData({
            nameInput: this.submitData.name || "",
            phoneInput: this.submitData.phone || ""
      })
      this.getResultData(this.id);
    },
    getResultData: function(id) {
       const that = this;
       app.loading();
       util.getRequest(domain + getUrl, {id}, function(response) {
         app.hideLoading();
         const result = JSON.parse(response.data.datajson);
         //小程序推送时间（提前一天）
         const dateString = result.duration.beDate.replace(/(\D)/g, ',');
         const dateArray = dateString.split(",", 3);
         that.dateForMessage = dateArray[0] + "-" + dateArray[1] + "-" + (dateArray[2] - 1);
         that.sendDate = dateArray[0] + "年" + dateArray[1] + "月" + (dateArray[2] - 1) + "日";
         that.setData({result})
       });
    },
    save: function() {
      app.getUser(this.postSave);
    },
    postSave: function() {
        const that = this;
        const data = this.data;
        if (this.validatePhone(this.data.phoneInput)) {
            return;
        } else if (this.checkEmpty()) {
            return;
        }
        const dataJson = {
            username: data.nameInput,
            phone: data.phoneInput,
            invitation_id: that.id,
            userid: wx.getStorageSync('invitationsUserInfo').openid
        }
        wx.request({
            url: "https://korjo.fans-me.com/korjoApi/SaveInvitationUser",
            data: {dataJson: JSON.stringify(dataJson)},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(response) {
                //如果事件时间在未来（明日到7天内），可以推送提醒(前一天)
                const today = new Date().getFullYear() + "-" + (new Date().getMonth() + 1 ) + "-" + new Date().getDate();
                const now = new Date().getTime();
                const sendtime = that.dateForMessage + ' 10:00:00';
                const formatedDateMs = that.formatDate(sendtime).getTime();
                if ((formatedDateMs - now) < 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000 && now < formatedDateMs) {
                    let successTitle = "提交成功, 请柬信息将在" + that.sendDate  + "10：00通过微信的服务通知窗口推送给您"
                    that.setData({
                        successTitle: successTitle
                    })
                    function goSend() {
                        that.send(e.detail.formId)
                    }
                    setTimeout(goSend, 2000);

                } else {
                    wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        mask: true,
                        duration: 2000
                    });
                    // setTimeout(that.goInvitation, 2000);
                }

            }
        })
    },
    send: function(formId) {
        const that = this;
        const result = that.result;
        const eventDate = result.duration.beDate + " " + result.beTime;
        const sendtime = this.dateForMessage + ' 10:00:00';
        const sendtype = 1;
        const param = {
            "touser": wx.getStorageSync("invitationsUserInfo").openid,
            "template_id": 'IbHDg3lz_N75_caoQ4fFmuN81vCD5Lks5pMe4dDbgMc',
            "page": "/pages/index_v/index_v?id=" + that.id + "&share=true",
            "form_id": formId,
            "data": {
                "keyword1": {
                    "value": result.title,
                    "color": "#c0272d"
                },
                "keyword2": {
                    "value": eventDate,
                    "color": "#999999"
                },
                "keyword3": {
                    "value": result.address,
                    "color": "#999999"
                }
            }
        }
        that.saveSendMsg(sendtime, param);
    },
    saveSendMsg: function(sendtime, param) {
        const that = this;
        const jsonData = {
            "messagejson": JSON.stringify(param),
             sendtime,
            "wxpublic_id": 23,
            "sendtype": 1,
            "openid": wx.getStorageSync("invitationsUserInfo").openid
        }
        wx.request({
            url: SaveSendMsgUrl,
            data: {jsonData: JSON.stringify(jsonData)},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(response) {
              wx.setStorageSync("submitData", {
                  name: that.submitData.name,
                  phone: that.submitData.phone
              })
              const status = JSON.parse(response.data.replace(/[()]/g,'')).status;
              let title = "提交成功";
              if (status == 201) {
                  title = "您已经报名";
              }
              wx.showToast({
                  title: title,
                  icon: "success",
                  duration: 1500
              });
              // setTimeout(that.goInvitation, 1500);
            }
        });
    },
    goInvitation: function(){
      wx.redirectTo({
          url: "../invitation/invitation?id=" + this.id + "&share=true"
      })
    },
    formatDate(time) {
        var arr = time.split(/[-T:\/\s]/);
        var date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        return date;
    },
    nameInput: function(e) {
        this.submitData.name = e.detail.value;
        this.setData({
            nameInput: e.detail.value
        })
    },
    phoneInput: function(e) {
       this.submitData.phone = e.detail.value;
       this.setData({
           phoneInput: e.detail.value
       })
    },
    phoneBlur: function(e) {
       const phone = e.detail.value;
       this.validatePhone(phone);

    },
    validatePhone: function(phone) {
       const phoneRe = /^[0-9]{11}$/;
       const result = phoneRe.test(phone);
       let hintText = "手机号格式错误"
       if (!result && phone) {
           this.setData({
               isHintHidden: false,
               hintText
           })
           setTimeout(this.hideHint, 1500);
           return true;
       }
    },
    hideHint: function() {
        this.setData({
            isHintHidden: true
        })
    },
    checkEmpty: function() {
        const name = this.data.nameInput.trim();
        const phone = this.data.phoneInput.trim();
        let hintText = "";
        if (!name && !phone) {
            hintText = "请填写姓名与电话";
        } else if (!name) {
            hintText = "请填写姓名";
        } else if (!phone) {
            hintText = "请填写电话";
        }
        if (hintText) {
            this.setData({
                isHintHidden: false,
                hintText
            })
            setTimeout(this.hideHint, 1500);
            return true;
        }
    }
})