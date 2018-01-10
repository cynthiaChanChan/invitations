const commonFun = require('../../utils/util.js');
const app = getApp();
const listUrl = "/KorjoApi/GetInvitationListByUserID";
const domain = app.globalData.domain;
Page({
    data: {
        listsArray: [],
        isHintHidden: true
    },
    onLoad: function(options) {
        app.getUser(this.requestGatherData);
    },
    requestGatherData: function() {
        const that = this;
        let isHintHidden = true;
        app.loading();
        commonFun.getRequest(domain + listUrl, {userid: wx.getStorageSync('invitationsUserInfo').openid}, function(response) {
            wx.hideToast();
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
       wx.redirectTo({
         url: "../invitation/invitation?id=" + dataset.id
       })
    },
    goCreate: function() {
       wx.redirectTo({
         url: "../create/create"
       })
    }
})
