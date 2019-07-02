var express=require('express');
var ejs=require('ejs');
var bodyparser=require('body-parser');
var index = require('./routers/index');
var user = require('./routers/user');
var product = require('./routers/product');
var category = require('./routers/category');
var app = require('./utils/app');
var cookie = require('cookie-parser');
var session = require('express-session');

// 1.设置默认node模板引擎
app.engine('.ejs',ejs.__express);
app.set('view engine', 'ejs');
app.set('views', 'views'); //模板文件默认所在的目录为views

//加载cookie和session中间件
app.use(cookie());
app.use(session({
    secret:'websecrect'
}));
// 2. 加载中间件
app.use(bodyparser.urlencoded({extended:false}));// 允许bodyparser解析名称值对数据
app.use(bodyparser.json());// 允许bodyparser解析json格式数据
//托管静态资源
app.use(express.static('public'));
// 路由中间件
app.use(index);
app.use('/user',user);
app.use('/product',product);
app.use('/category',category);


//暴露接口
module.exports=app;
