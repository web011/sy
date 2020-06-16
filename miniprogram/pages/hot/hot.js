// pages/hot/hot.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pno:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
  },
  loadMore:function(){
    this.setData({
      pno:this.data.pno+1
    })
    var pno = this.data.pno;
    wx.cloud.callFunction({
      name:"movielist",
      data:{
        start:(pno-1)*16,
        count:16
      }
    }).then(res=>{
      // 将JSON字符串进行解析，转为对象
      var rows=JSON.parse(res.result);
      // 电影列表数组
      var lists=this.data.list.concat(rows.subjects);
      this.setData({
        list:lists
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  loadMores:function(){
    this.setData({
      pno:this.data.pno+1
    })
    var pno = this.data.pno;
    wx.cloud.callFunction({
      name:"movielist",
      data:{
        start:(pno-1)*16,
        count:16
      }
    }).then(res=>{
      // 将JSON字符串进行解析，转为对象
      var rows=JSON.parse(res.result);
      // 电影列表数组
      var lists=rows.subjects;
      this.setData({
        list:lists
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadMores();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})