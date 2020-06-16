// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btns:["电影","电视剧","综艺","动漫"],
    active:0,
    btna:["更新时间","时间","人气","评分"],
    actives:0,
    detail:["全部","动作片","喜剧片","爱情片","科幻片","恐怖片","剧情片","战争片","搞笑片","福利片","伦理片","犯罪片","奇幻片","悬疑片","音乐片","惊悚片"],
    detaillick:0,
    details:["全部","美国","韩国","中国大陆","日本","中国香港","法国","香港","加拿大","印度","德国","西班牙","泰国","中国","伊朗","英国"],
      tiem:["全部","90","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009"],
      tiems:0,
    detailsclick:0,
    list:[],
    pno:0,
    pnos:20,
    SratchValue:''
  },
  clicks:function(event){
    this.setData({
      active:event.target.dataset.index
    })
  },
  clicka:function(event){
    this.setData({
      actives:event.target.dataset.index
    })
  },
  detaillicks:function(event){
    this.setData({
      detaillick:event.target.dataset.index
    })
  },
  detailsclicks:function(event){
    this.setData({
      detailsclick:event.target.dataset.index
    })
  },
  tiema:function(event){
    this.setData({
      tiems:event.target.dataset.index
    })
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
  Search:function(event){
    if(event.target.dataset.item!=undefined){
      this.setData({
        SratchValue:event.target.dataset.item
      })
      var value = this.data.SratchValue;
      var url = `https://movie.douban.com/j/search_subjects?type=movie&tag=${value}&sort=recommend&page_limit=${this.data.pnos}`
      // https://movie.douban.com/j/search_subjects?type=movie&tag=喜剧片&sort=recommend&page_limit=20
      url = encodeURI(url);
      wx.cloud.callFunction({
        name:"Search",
        data:{
          url
        }
      })
      .then(res=>{
        var result = JSON.parse(res.result);
        this.setData({
          list:result.subjects,
          pnos:20
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }else{
      // console.log("这个是点击空的地方"+event.target.dataset.item)
    }
  },
  Searchs:function(){
      setTimeout(() => {
        var value = this.data.SratchValue;
        this.setData({
          pnos:this.data.pnos+=20
        })
        var url = `https://movie.douban.com/j/search_subjects?type=movie&tag=${value}&sort=recommend&page_limit=20&page_start=${this.data.pnos}`
        url = encodeURI(url);
        wx.cloud.callFunction({
          name:"Search",
          data:{
            url
          }
        })
        .then(res=>{
          var result = JSON.parse(res.result);
          this.setData({
            list:this.data.list.concat(result.subjects)
          })
        })
        .catch(err=>{
          console.log(err)
        })
      }, 1000);
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
    if(this.data.list[0].casts){
      this.loadMore();
    }else{
      this.Searchs();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})