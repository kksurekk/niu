var multer=require('multer');
var path=require('path');
var app = require('../utils/app');

var storage = multer.diskStorage({
    // 设置上传文件目录
    destination:function(req,file,cb){
        var uploadFolder=path.join(path.resolve('.'),'public/upload');// 上传头所在目录
        // console.log('1111b   '+uploadFolder);
        cb(null,uploadFolder);// 保存的路径，备注：需要自己创建
    },
    // 自定义上传文件名
    filename:function(req,file,cb){
        var fileName = file.fieldname+ Date.now() +'.png';
         // session对象
        app.headerFile = fileName;
        console.log('111 app.headerFile :'+app.headerFile);
        cb(null,fileName);
    }
});
var upload = multer({storage:storage});

module.exports=upload;