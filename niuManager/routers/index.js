var express=require('express');
var index=express.Router();
var querydb = require('../utils/querydb');
var upload = require('../utils/uploadFile');
var app = require('../utils/app');
/**
 * 所有请求都会到达该路由执行
 * 拦截器,实现统一登录认证
 */
index.get('*',(req,res,next)=>{
    var url = req.url;
    if (url.indexOf('login') !== -1 || url.indexOf('register') !== -1 || url.indexOf('registerSubmit') !== -1 || url.indexOf('checkuser') !== -1) {
        next(); // 放行，继续向下执行
        return;
    }

    // --登录验证---
    var loginStatus = req.session.user;
    // 登录判断，判断依据，session对象中是否保存用户登录状态信息。
    if (loginStatus != null && typeof (loginStatus) !== 'undefined') {
        next(); // 放行，继续向下执行
    } else {
        // req.session.msg = '你还没有登录';
        // res.redirect('/login?msg=你还没有登录');
        req.session.msg = '你还没有登录,请先登录';
        res.redirect('/login');
    }
});
// index.get('*',function(req,res,next){
//     // --不需要登录认证路由直接放行---
//     var url = req.url;
//     if (url.indexOf('login') !== -1 || url.indexOf('register') !== -1 || url.indexOf('registerSubmit') !== -1 || url.indexOf('checkuser') !== -1) {
//         next(); // 放行，继续向下执行
//         return;
//     }

//     // --登录验证---
//     var loginStatus = req.session.user;
//     // 登录判断，判断依据，session对象中是否保存用户登录状态信息。
//     if (loginStatus != null && typeof (loginStatus) !== 'undefined') {
//         next(); // 放行，继续向下执行
//     } else {
//         // req.session.msg = '你还没有登录';
//         // res.redirect('/login?msg=你还没有登录');
//         req.session.msg = '你还没有登录,请先登录';
//         res.redirect('/login');
//     }

// });
/**
 * 用户注册
 */
index.get('/register',(req,res) =>{
    res.render('register',{message:''});
});
// index.get('/register',function(req,res){
//     res.render('register',{message:''});
// });
/**
 * 用户注册提交
 */
index.post('/registerSubmit',upload.single('userHeader'),async function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    var headerImg = null; // 头像地址
    // 类型判断typeof(10) => number;  typeof('10') => string  typeof(username) => undefined
    // !==undefined 说明选择头像上传
    if (typeof (app.headerFile) !== 'undefined') {
        headerImg = 'upload/' + app.headerFile;
    }

    var sql = 'INSERT INTO user (username,password,headerurl) VALUES (?,?,?)';
    var param = [username,password,headerImg];
    try{
        await querydb(sql,param);
        res.render('register',{
        message: '注册成功!'});
    }
    catch(err){
        console.log('注册用户失败' + err);
    }
  });
/**
 * 检查用户是否已经注册
 */
index.get('/checkuser', async function (req, res) {
    var username = req.query.username; // 接收客户端将要注册的用户名
    var sql = 'SELECT * FROM user WHERE username = ?';
    var param = [username];

    var data = await querydb(sql,param);
        if (data.length > 0) {
            res.send({code: 1, msg: '用户已经注册' });
        } else {
            res.send({ code: -1, msg: '用户没有注册'});
        }
    });

/**
 * http://ip:port/login 
 * 进入登录界面
 */
index.get('/login',function(req,res){
    var msg = req.session.msg;
    msg = typeof(msg) === 'undefined' ? '' : msg;
     // 读取cookie信息
    var cookieUser = req.cookies.user;
    console.log('cookieUser :' + JSON.stringify(cookieUser));
    if(cookieUser != null && typeof (cookieUser) !== 'undefined'){
        res.render('login', {
            message: msg,
            user: {
                username: cookieUser.name,
                password: cookieUser.password
            }
        });
    }else{
        res.render('login', {
            message: msg,
            user: {username:'',password:''}
        });
    }
    // 将login.ejs模板与json数据进行组装成html代码，发送给浏览器客户端
    
});
/**
 * 处理ajax异步登录请求
 */
index.post('/loginSubmit',async function (req, res) {
    var username = req.body.user;
    var password = req.body.password;
    var autoLogin = req.body.autoLogin;
    var sql = 'SELECT username,password FROM user WHERE username=? AND password=?';
    var param = [username, password];

    var data = await querydb(sql,param);
    // 如果查询结果大于0，说明用户已经注册
    if (data.length > 0) {
         // 登录成功
            // cookie实现记住密码
        if(autoLogin === 'true'){
             // 保存cookie到响应头发送给客户端
            res.cookie('user',{
                name:username,
                password:password
            },{
                maxAge: 1000 * 60 * 60 * 24 * 365,
                path: '/',
                secure: false,
            });
        }else{
            res.clearCookie('user');// 清除cookie
        }
        // 保存登录状态信息
        req.session.user = username;
        res.send({code: 1});
    } else {
        res.send({ code: -1,error: '用户名或密码出错!'});
    }
    });

/**
 * http://ip:port/main
 * 进入主界面
 */
index.get('/main', function (req, res) {
    res.render('main'); // 进入主界面
});
/**
 * 退出登录
 */
index.get('/logout',function(req,res){
    req.session.user = null;
    req.session.destroy();// 销毁session
    res.redirect('/login');
});
module.exports=index;