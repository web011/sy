// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propList:{type:Array}
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    Sharing:function(event){
      var id = event.target.dataset.id
      wx.navigateTo({
        url: "/pages/details/details?id="+id,
      })
    }
  }
})