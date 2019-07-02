var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var niuRouter = require('./routes/niu');

var app = express();

// view engine setup// 1.设置默认模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//模板文件默认所在的目录为views

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie中间件,调用cookie构造函数得到cookie实例
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//托管静态资源中间件
app.use('/', niuRouter);// 路由中间件

// catch 404 and forward to error handler捕获404并转发到错误处理程序
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development设置局部变量，只提供开发中的错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page呈现错误页
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
