const commonFun = require('../../utils/util.js');
const app = getApp();
const listUrl = "/KorjoApi/GetInvitationListByUserID";
const registeredUrl = "/korjoApi/GetMyInvitationUserList";
const domain = app.globalData.domain;
Page({
    data: {
        listsArray: [],
        isHintHidden: true,
        activeIndex: 0,
        types: [{
            title: "我制作的请柬",
            active: "active"
        },{
            title: "我报名的请柬",
            active: ""
        }]
    },
    onLoad: function(options) {
        app.getUser(this.requestGatherData);
        app.getUser(this.requestRegistered);
    },
    checkType: function(e) {
        const index = e.currentTarget.dataset.index;
        const types = this.data.types;
        types[this.data.activeIndex].active = "";
        types[index].active = "active";
        this.setData({
            types,
            activeIndex: index
        })
    },
    requestRegistered: function() {
        const that = this;
        let isNullHidden = true;
        commonFun.getRequest(domain + registeredUrl, {userid: wx.getStorageSync('invitationsUserInfo').openid}, function(response) {
            const resultList = response.data;
            const items = [];
            if (resultList.length > 0) {
                for (let result of resultList) {
                    const dataObj = JSON.parse(result.datajson);
                    items.push({id: result.invitation_id, dataObj});
                }
            } else {
                isNullHidden = false;
            }
            that.setData({
                items,
                isNullHidden
            })
        })
    },
    requestGatherData: function() {
        const that = this;
        let isHintHidden = true;
        app.loading();
        commonFun.getRequest(domain + listUrl, {userid: wx.getStorageSync('invitationsUserInfo').openid}, function(response) {
            const resultList = response.data;
            const listsArray = [];
            if (resultList.length > 0) {
                for (let result of resultList) {
                    const dataObj = JSON.parse(result.datajson);
                    listsArray.push({id: result.id, dataObj, userList: result.userList, isHidden: true});
                }

            } else {
                isHintHidden = false;
            }
            that.setData({
                isHintHidden,
                listsArray
            })
            app.hideLoading();
        })
    },
    getAcceptance: function(e) {
        const index = e.currentTarget.dataset.index;
        const listsArray = this.data.listsArray;
        const hidden = listsArray[index].isHidden;
        listsArray[index].isHidden = !hidden;
        this.setData({
            listsArray: listsArray
        })
    },
    goInvitation: function(e) {
      const dataset = e.currentTarget.dataset;
      let url = "../invitation/invitation?id=" + dataset.id;
      if (dataset.share) {
        url += "&share=true";
      }
       wx.redirectTo({url});
    },
    goCreate: function() {
       wx.redirectTo({
         url: "../create/create"
       })
    }
})
