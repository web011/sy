// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 引入request-promise库
const rp = require("request-promise")
exports.main = async(event,context)=>{
  // 创建url地址
  var url = "http://api.douban.com/v2/movie/top250";
  url += "?apikey=0df993c66c0c636e29ecbb5344252a4a";
  url += `&start=${event.start}&count=${event.count}`;
  // 发送ajax请求
  return rp(url).then(res=>{
    return res;
  })
  .catch(err=>{
    console.log(err);
  })
}