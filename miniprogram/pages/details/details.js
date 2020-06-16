// pages/details/details.js
// 1.创建数据对象
const db = wx.cloud.database();
const order = ['demo1', 'demo2', 'demo3']
Page({
  onShareAppMessage() {
    return {
      title: 'scroll-view',
      path: 'page/component/pages/scroll-view/scroll-view'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    toView: 'green',
    detailid:0,
    detail:[],
    list:[],
    pno:0,
    collection:0,
    _id:"",
    collapse:0
  },
  collapse:function(){
    if(this.data.collapse){
      this.setData({
        collapse:0
      })
    }else{
      this.setData({
        collapse:1
      })
    }
  },
  onChanges({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailid:options.id
    })
    this.loadMore();
    this.details();
  },
  loadMore:function(){
    // 1获取用户选中电影id
    var id = this.data.detailid;
    db.collection("collection")
    .where({
      id:id
    })
    .get()
    .then(res=>{
      if(res.data.length>0){
        this.setData({
          collection:1,
          _id:res.data[0]._id
        })
      }
    }).catch(err=>{console.log(err)})
    // 2显示数据加载提示框
    wx.showLoading({
      title: '正在加载数据....',
    })
    // 3调用云函数然后把id传过去
    wx.cloud.callFunction({
      name:"movieid",
      data:{id:id}
    }).then(res=>{
     // 4获取云函数返回的数据,由于是字符串需要转换成对象
     var obj = JSON.parse(res.result)
     // 5把返回的数据保存在data里面的detail里面
     this.setData({
      detail:obj
     })
     // 6隐藏加载提示框
     wx.hideLoading();
     db.collection("record")
     .where({
       title:this.data.detail.title
     })
     .get()
     .then(res=>{
       if(res.data.length>0){
         db.collection("record")
         .doc(res.data[0]._id)
         .remove()
         .then(res=>{
            // console.log("删除成功")
         })
         .catch(err=>{
            // console.log("删除失败")
         })
       }
       var d = new Date();
       var tiem = d.toLocaleDateString();
       tiem+=" "+d.toLocaleTimeString();
        db.collection("record")
        .add({
          data:{
            tiem:tiem,
            imgs:this.data.detail.images.large,
            title:this.data.detail.title,
            directors:this.data.detail.directors[0].name,
            casts:this.data.detail.casts[0].name,
            year:this.data.detail.year,
            id:this.data.detail.id
          }
        }).then(res=>{
          // console.log(res)
        }).catch(err=>{
          console.log(err);
        })
     }).catch(err=>{
       console.log(err)
     })

    })
    .catch(err=>{
      console.log(err)
    })
  },
  Srarch:function(event){
    var id = event.target.dataset.id
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  },
  details:function(){
    this.setData({
      pno:this.data.pno+1
    })
    var pno = this.data.pno;
    wx.cloud.callFunction({
      name:"movielist",
      data:{
        start:(pno-1)*20,
        count:20
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
  // 收藏
  CollectionChange:function(){
    // 取消收藏
    if(this.data.collection){
      this.setData({
        collection:0
      })
      var _id = this.data._id;
      db.collection("collection")
      .doc(_id)
      .remove()
      .then(res=>{
        console.log("取消收藏成功")
        // console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })
      // 收藏成功
    }else{
      this.setData({
        collection:1
      })
      db.collection("collection")
      .add({
        data:{
          imgs:this.data.detail.images.large,
          title:this.data.detail.title,
          directors:this.data.detail.directors[0].name,
          casts:this.data.detail.casts[0].name,
          year:this.data.detail.year,
          id:this.data.detail.id
        }
      }).then(res=>{
        console.log("收藏成功")
        // console.log(res)       
      }).catch(err=>{
        console.log(err)
      })
    }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})