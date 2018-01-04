const url = "http://g.m.fans-me.com/invitationImg/bgs/";
const choices = [{
  type: "活动邀请",
  idName: "show",
  bgColor: "#e51873",
  bgs: [{
    id: 1,
    img:  `${url}show/1.jpg`,
    fontColor: "#000",
    buttonColor: "ee1b44"
 },{
   id: 2,
   img:  `${url}show/2.jpg`,
   fontColor: "#000",
   buttonColor: "#e51873"
  }]
}, {
  type: "派对饭局",
  idName: "party",
  bgColor: "#fb8736",
  bgs: [{
      id: 1,
      img:  `${url}party/1.jpg`,
      fontColor: "#000",
      buttonColor: "ee1b44"
  },{
     id: 2,
     img:  `${url}party/2.jpg`,
     fontColor: "#000",
     buttonColor: "#e51873",
  },{
     id: 3,
     img:  `${url}party/3.jpg`,
     fontColor: "#e74c3c",
     buttonColor: "#6cd5da"
  }]
}, {
  type: "商务会议",
  idName: "business",
  bgColor: "#757575",
  bgs: [{
    id: 1,
    img:  `${url}business/1.jpg`,
    fontColor: "#000",
    buttonColor: "ee1b44"
  }]
}, {
  type: "婚礼典礼",
  idName: "ceremony",
  bgColor: "#a8d06d",
  bgs: [{
    id: 1,
    img:  `${url}ceremony/1.jpg`,
    fontColor: "#000",
    buttonColor: "ee1b44"
  }]
}, {
  type: "自定义",
  bgColor: "#33cbcc"
}];

module.exports.choices = choices;
