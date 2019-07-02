var express=require('express');
var path=require('path');
var fs=require('fs');
var querydb = require('../utils/querydb');
var upload = require('../utils/uploadFile');
var userRoute = express.Router();
var app = require('../utils/app');

/**
 * 用户列表
 */
userRoute.get('/list',async function(req,res){
    var pageSize = 5;//每页显示的条数
    var currentNo = req.query.pageNo; // 当前页号
    if (currentNo == null && typeof(currentNo) === 'undefined'){
        currentNo = 1;
    }
    // 记录条数
    // 查询总记录条数
    var data = await querydb('SELECT count(*) as num FROM user');
    var totalNo = data[0].num;// 总记录条数
    var pagesNum = 0;// 总页数
    if(totalNo % pageSize === 0){
        pagesNum = totalNo / pageSize;
    }else{
        pagesNum = totalNo / pageSize +1;
    }
    var start = (currentNo -1)*pageSize;// 偏移量
    var sql = 'SELECT id,username,password,headerurl FROM user LIMIT ?, ?' ;
    var param = [start,pageSize];
    try{
        var data2 = await querydb(sql,param);
        res.render('user/list', {
            userList: data2,
            currenNo: currentNo,
            pagesNum:parseInt(pagesNum)
        });
    }catch(err){
        console.log('查询用户失败'+err);
        return;
    }
    
  }); 
/**
 * 删除 /delete?id=1
 */
userRoute.get('/delete',async function (req, res) {
    var id = req.query.id; // 用户id
    var data = await querydb('SELECT headerurl FROM user WHERE id=?', [id]);
    var headerUrl = data[0].headerurl;
        // 判断是否上传头像，如果headerUrl不为null 并且不是''，说明上传头像
        if (headerUrl != null && headerUrl !== '') {
            // 删除头像
            var headerDir = path.join(path.resolve('.'), 'public/', headerUrl);
            //fs.unlink删除文件  
            fs.unlink(headerDir, function (error) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log('删除文件成功');
            });
        }
        await querydb('DELETE FROM user WHERE id = ?', [id]);
        res.redirect('list');
});
   
/**
 * 修改
 */
userRoute.get('/update',async function (req, res) {
    var id = req.query.id;
    var sql = 'SELECT id,username,password,headerurl FROM user WHERE id=?';
    var param = [id];
    try{
        var data = await querydb(sql,param);
        console.log(data[0]);
        res.render('user/update',data[0]);
    }catch(err){
        console.log('查询用户失败'+err);
        return;
    }
  });  
/**
 * 修改提交
 */
userRoute.post('/update',upload.single('upHeaderImg'),async function (req, res) {
    var id = req.body.id; // 数组下标
    var username = req.body.username;
    var password = req.body.password;

    var sql = '';
    var param = [];
    var headerImg = null;
    // 判断有无选择文件
    if(app.headerFile != null && typeof(app.headerFile) !== 'undefined'){
        headerImg = 'upload/' + app.headerFile;
        sql = 'UPDATE user SET username = ?,password=?,headerurl=? WHERE id =?';
        param = [username,password,headerImg,id];
    }else{
        sql = 'UPDATE user SET username = ?,password=? WHERE id =?';
        param = [username,password,id];
    }
    app.headerFile = null; // 初始化headerFile
    try{
        var data = await querydb(sql,param);
        console.log('修改用户成功!' + data);
        res.redirect('list'); // 重定向
    }catch(err){
        console.log('修改用户失败' + err);
        return;
    }
  }); 
/**
 * 用户添加
 */
userRoute.get('/add',function(req,res){
    res.render('user/add');
});
/**
 * 添加用户提交
 */
userRoute.post('/add', upload.single('headerImg'),async function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    var headerImg = null; // 头像地址
    // 类型判断typeof(10) => number;  typeof('10') => string  typeof(username) => undefined
    // !==undefined 说明选择头像上传
    if (app.headerFile != null && typeof(app.headerFile) !== 'undefined') {
        headerImg = 'upload/' + app.headerFile;
    }
    var sql = 'INSERT INTO user (username,password,headerurl) VALUES (?,?,?)';
    var param = [username,password,headerImg];
    await querydb(sql,param);
        res.redirect('list');
   });
   module.exports=userRoute;