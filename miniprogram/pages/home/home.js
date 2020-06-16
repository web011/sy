// pages/home/home.jsz
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    list:[],
    pno:0,
    imgs:["http://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg","http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561716440.jpg","http://img9.doubanio.com/view/photo/s_ratio_poster/public/p1484728154.jpg","http://img3.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg","http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2578474613.jpg"]
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
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