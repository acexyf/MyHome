var multer = require('multer');
var fs = require('fs');
var paths=require('path');
var storage = multer.diskStorage({
      //设置上传后文件路径，uploads文件夹会自动创建。
      destination: function (req, file, cb) {
          let route=new Date().Format('yyyyMMdd');
          let path='D:/MyConfiguration/xyf17469/Desktop/ImageUpload/public/images/'+route+'/';
          fs.exists(path,function(result){
            if(result){
              cb(null, './public/images/'+route+'/');
            }
            else{
              fs.mkdir(path,function(){
                cb(null, './public/images/'+route+'/');
              });
            }
          });
      }, 
      //给上传文件重命名，获取添加后缀名
      filename: function (req, file, cb) {
          var fileFormat = (file.originalname).split(".");
          //console.log(file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
          cb(null, file.originalname);
      }
 });
//添加配置文件到muler对象。
var upload = multer({
      storage: storage
});

module.exports = upload;


Date.prototype.Format = function(fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "h+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}