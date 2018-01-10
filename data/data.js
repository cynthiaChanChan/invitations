const url = "https://www.korjo.cn/xcx/invitationImg/bgs/";
const choices = [{
  type: "商务活动",
  idName: "show",
  bgColor: "#e51873",
  bgs: [{
    id: 1,
    img:  `${url}show/1.jpg`,
    fontColor: "#000",
    buttonColor: "#ee1b44"
   },{
     id: 2,
     img:  `${url}show/2.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 3,
     img:  `${url}show/3.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 4,
     img:  `${url}show/4.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 5,
     img:  `${url}show/5.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 6,
     img:  `${url}show/6.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 7,
     img:  `${url}show/7.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 8,
     img:  `${url}show/8.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 9,
     img:  `${url}show/9.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
   },{
     id: 10,
     img:  `${url}show/10.jpg`,
     fontColor: "#000",
     buttonColor: "#ee1b44"
    }]
  }, {
    type: "派对聚会",
    idName: "party",
    bgColor: "#fb8736",
    bgs: [{
        id: 1,
        img:  `${url}party/1.jpg`,
        fontColor: "#000",
        buttonColor: "#fb8736"
    },{
       id: 2,
       img:  `${url}party/2.jpg`,
       fontColor: "#000",
       buttonColor: "#fb8736",
    },{
       id: 3,
       img:  `${url}party/3.jpg`,
       fontColor: "#e74c3c",
       buttonColor: "#fb8736"
    },{
       id: 4,
       img:  `${url}party/4.jpg`,
       fontColor: "#e74c3c",
       buttonColor: "#fb8736"
     },{
        id: 5,
        img:  `${url}party/5.jpg`,
        fontColor: "#000",
        buttonColor: "#fb8736",
     },{
        id: 6,
        img:  `${url}party/6.jpg`,
        fontColor: "#e74c3c",
        buttonColor: "#fb8736"
     },{
        id: 7,
        img:  `${url}party/7.jpg`,
        fontColor: "#e74c3c",
        buttonColor: "#fb8736"
     },{
        id: 8,
        img:  `${url}party/8.jpg`,
        fontColor: "#000",
        buttonColor: "#fb8736",
     },{
        id: 9,
        img:  `${url}party/9.jpg`,
        fontColor: "#e74c3c",
        buttonColor: "#fb8736"
     },{
        id: 10,
        img:  `${url}party/10.jpg`,
        fontColor: "#e74c3c",
        buttonColor: "#fb8736"
     }]
  }, {
    type: "儿童派对",
    idName: "children",
    bgColor: "#f0415f",
    bgs: [{
      id: 1,
      img:  `${url}children/1.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 2,
      img:  `${url}children/2.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 3,
      img:  `${url}children/3.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 4,
      img:  `${url}children/4.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 5,
      img:  `${url}children/5.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 6,
      img:  `${url}children/6.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 7,
      img:  `${url}children/7.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 8,
      img:  `${url}children/8.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    },{
      id: 9,
      img:  `${url}children/9.jpg`,
      fontColor: "#000",
      buttonColor: "#f0415f"
    }]
  }, {
    type: "典礼活动",
    idName: "ceremony",
    bgColor: "#dd7854",
    bgs: [{
      id: 1,
      img:  `${url}ceremony/1.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 2,
      img:  `${url}ceremony/2.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 3,
      img:  `${url}ceremony/3.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 4,
      img:  `${url}ceremony/4.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 5,
      img:  `${url}ceremony/5.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 6,
      img:  `${url}ceremony/6.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 7,
      img:  `${url}ceremony/7.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 8,
      img:  `${url}ceremony/8.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    },{
      id: 9,
      img:  `${url}ceremony/9.jpg`,
      fontColor: "#000",
      buttonColor: "#dd7854"
    }]
  }, {
    type: "自定义",
    bgColor: "#33cbcc"
}];
// 上面的颜色也要出现
const fontColors = [{"color":"#000"},{"color":"#1aad19"},{"color":"#e74c3c"},{"color":"#04b29f"},{"color":"#3366ff"},{"color":"#c31717"},{"color":"#f4ad22"},{"color":"#d5049d"}];
const buttonColors = [{"color":"#6cd5da"},{"color":"#ee1b44"},{"color":"#e74c3c"},{"color":"#e51873"},{"color":"#f0415f"},{"color":"#dd7854"},{"color":"#f4ad22"},{"color":"#d5049d"}];
module.exports.choices = choices;
module.exports.fontColors = fontColors;
module.exports.buttonColors = buttonColors;
