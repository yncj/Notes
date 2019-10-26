//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onReady: function(){
    this.pop = this.selectComponent("#dialog")
  },
  onLoad: function () {
    
  },
  show(){
    this.pop.showDialog()
  },
  cancel(){
    this.pop.hideDialog();
    wx.showToast({
      title: '我已经学会了',
    });
  },
  confirm(){
    this.pop.hideDialog();
    wx.showToast({
      title: '加油，在看一遍就会了',
      icon:"loading"
    })
  }
})
