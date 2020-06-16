// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// 1引入request-promise
const rp = require("request-promise")
// 2创建主函数
exports.main = async (event,context)=>{
  // 3创建url
  var url = "http://api.douban.com/v2/movie/subject/"+event.id;
  url += "?apikey=0df993c66c0c636e29ecbb5344252a4a";
  // 4使用request-promise发送请求
  return rp(url).then(res=>{
    return res;
  }).catch(err=>{
    console.log(err)
  })
}