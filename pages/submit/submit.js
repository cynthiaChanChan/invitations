const app = getApp()
const util = require('../../utils/util.js');
const getUrl = "/korjoApi/GetInvitationInfo";
const SaveSendMsgUrl = "/KorjoApi/SaveSendMsg";
const domain = app.globalData.domain;
Page({
    data: {
      isDisabled: false,
      isHintHidden: true,
      namePlaceHolder: "姓名",
      phonePlaceHolder: "手机"
    },
    onLoad: function(options) {
      this.id = options.id;
      let namePlaceHolder = this.data.namePlaceHolder;
      let phonePlaceHolder = this.data.phonePlaceHolder;
      this.submitData = wx.getStorageSync("submitData") || {};
      if (this.submitData.name) {
        namePlaceHolder = "";
      }
      if (this.submitData.phone) {
        phonePlaceHolder = "";
      }
      this.setData({
            nameInput: this.submitData.name || "",
            phoneInput: this.submitData.phone || "",
            phonePlaceHolder,
            namePlaceHolder
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
         if (util.formatDate(`${result.duration.enDate} ${result.duration.enTime}:00`) < new Date().getTime()) {
           console.log("it's over!")
           that.setData({
               isDisabled: true,
               isHintHidden: false,
               hintText: "抱歉，活动时间已经结束无法应邀",
           })
         }
         that.setData({result})
       });
    },
    save: function(e) {
      app.getUser(() => {
        this.postSave(e);
      });
    },
    postSave: function(e) {
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
        wx.setStorageSync("submitData", {
            name: that.submitData.name,
            phone: that.submitData.phone
        })
        wx.request({
            url: domain + "/korjoApi/SaveInvitationUser",
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
                const status = JSON.parse(response.data.replace(/[()]/g,'')).status;
                let title = "提交成功";
                if (status == 201) {
                    title = "您已经报名";
                    that.saveSuccssedHint(title);
                } else {
                  if ((formatedDateMs - now) < 7 * 24 * 60 * 60 * 1000 - 60 * 60 * 1000 && now < formatedDateMs) {
                      let successTitle = "提交成功, 请柬信息将在" + that.sendDate  + "10：00通过微信的服务通知窗口推送给您"
                      that.setData({
                        isHintHidden: false,
                        hintText: successTitle,
                      })
                      function goSend() {
                          that.send(e.detail.formId)
                      }
                      setTimeout(goSend, 2000);

                  } else {
                    that.saveSuccssedHint(title);
                  }
                }
            }
        })
    },
    send: function(formId) {
        const that = this;
        const result = that.data.result;
        const eventDate = result.duration.beDate + " " + result.duration.beTime;
        const sendtime = this.dateForMessage + ' 10:00:00';
        // const sendtime = "2018-1-12 17:12:00";
        const sendtype = 1;
        const param = {
            "touser": wx.getStorageSync("invitationsUserInfo").openid,
            "template_id": 'IbHDg3lz_N75_caoQ4fFmuN81vCD5Lks5pMe4dDbgMc',
            "page": "/pages/invitation/invitation?id=" + that.id + "&share=true",
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
                    "value": result.locationInfo.address,
                    "color": "#999999"
                }
            }
        }
        that.saveSendMsg(sendtime, param);
    },
    saveSuccssedHint: function(title) {
      const that = this;
      wx.showToast({
          title,
          icon: "success",
          mask: true,
          duration: 2000
      });
      console.log("提交用户信息");
      setTimeout(that.goInvitation, 1500);
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
        console.log("推送信息：", jsonData);
        wx.request({
            url: domain + SaveSendMsgUrl,
            data: {jsonData: JSON.stringify(jsonData)},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(response) {
              setTimeout(that.goInvitation, 1500);
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
