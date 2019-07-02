var express = require('express');
var productRoute = express.Router();
var app = require('../utils/app');
var querydb = require('../utils/querydb');
var upload = require('../utils/uploadFile');
var path = require('path');
var fs = require('fs');
/**
 * 商品添加
 */
productRoute.get('/add',async function(req,res){
    var sql = 'SELECT t_id,t_name FROM t_category';
    var data = await querydb(sql);
    res.render('product/add',{list:data});
});
/**
 * 添加商品提交
 */
productRoute.post('/add', upload.single('pictureImg'), async function (req, res) {
    // 1. 接收参数
    var productName = req.body.productName;
    var price = req.body.price;
    var number = req.body.number;
    var description = req.body.description;
    var categoryId = req.body.category;

    var pictureUrl = null; //图片地址
    if (app.headerFile != null && typeof (app.headerFile) !== 'undefined') {
        pictureUrl = 'upload/'+app.headerFile;
        app.headerFile = null; // 清除app对象headerFile值
    }
    var sql = 'INSERT INTO t_product (name,description,price,picture,number,c_id) VALUES (?,?,?,?,?,?)';
    var param = [productName, description, price, pictureUrl, number,categoryId];
    await querydb(sql, param); // 插入数据到数据库
    res.redirect('/product/list');

});
/**
 * 商品列表
 */
productRoute.get('/list', async function(req,res){
    var pageSize = 5;//每页显示的条数
    var currentNo = req.query.pageNo; // 当前页号
    if (currentNo == null && typeof(currentNo) === 'undefined'){
        currentNo = 1;
    }
    // 记录条数
    // 查询总记录条数
    var data2 = await querydb('SELECT count(*) as num FROM t_product');
    var totalNo = data2[0].num;// 总记录条数
    var pagesNum = 0;// 总页数
    if(totalNo % pageSize === 0){
        pagesNum = totalNo / pageSize;
    }else{
        pagesNum = totalNo / pageSize +1;
    }
    var start = (currentNo -1)*pageSize;// 偏移量
    var sql = 'SELECT  id, name,description,price,picture,number,t_name FROM t_product, t_category WHERE t_id = c_id LIMIT ?, ?';
    var param = [start,pageSize];
    try{
        var data = await querydb(sql,param);
        res.render('product/list', {
            list: data,
            currenNo: currentNo,
            pagesNum:parseInt(pagesNum)
        });
    }catch(err){
        console.log('查询用户失败'+err);
        return;
    }
    
  }); 
/**
 * 修改
 */
productRoute.get('/update',async function (req, res) {
    var id = req.query.id;
    var categorydata = await querydb('SELECT t_id,t_name FROM t_category');
    var sql = 'SELECT id,name,description,price,picture,number,c_id FROM t_product WHERE id=?';
    var param = [id];
    try{
        var data = await querydb(sql,param);
        var product = data[0];
        res.render('product/update',{product:product,list:categorydata});
    }catch(err){
        console.log('查询用户失败'+err);
        return;
    }
  });  
/**
 * 修改提交
 */
productRoute.post('/update', upload.single('upHeaderImg'), async function (req, res) {
    // 1. 接收参数
    var id = req.body.id;
    var productName = req.body.productName;
    var price = req.body.price;
    var description = req.body.description;
    var number = req.body.number;
    var categoryId = req.body.category;
 
    // 2.是否选修改图片，获此图片地址,如果pictureUrl==null说明没有选择修改图片
     var pictureUrl = null; //图片地址
     if (app.headerFile != null && typeof (app.headerFile) !== 'undefined') {
         pictureUrl = 'upload/' + app.headerFile;
         app.headerFile = null; // 清除app对象headerFile值
     }

    var data = await querydb('SELECT picture FROM t_product WHERE id = ?', [id]);
    var oldPicture = data[0].picture;
    //3.是否删除原图片
    if (pictureUrl !== null && oldPicture !== null){
        //3.1获取原图片地址
        var picDir = path.join(path.resolve('.'), 'public', oldPicture);
        fs.exists(picDir, function (exists) {
            if (exists) {
                fs.unlink(picDir, function (err) {
                    if (err) {
                        console.log('删除失败');
                    } else {
                        console.log('删除成功');
                    }
                });
            }
        }); 
    }

    //4. 修改商品
    if (pictureUrl === null){
       pictureUrl = oldPicture;
    }
    await querydb('UPDATE t_product SET name=?,description=?,price=?,picture=?,number=?,c_id=? WHERE id =?', [productName, description, price, pictureUrl,number,categoryId,id]);

    // 5. 列表界面
    res.redirect('/product/list');
});
  /**
 * 删除
 */
productRoute.get('/delete',async function(req,res){
    var id = req.query.id;
    var sql = 'SELECT picture FROM t_product WHERE id=?';
    var param = [id];
    var data = await querydb(sql,param);
    var picture = data[0].picture;
    if(picture != null && picture !==''){
        var pictureDir = path.join(path.resolve('.'),'public/', picture);
        fs.unlink(pictureDir, function (error) {
            if (error) {
                console.log(error);
                return;
            }
            console.log('删除文件成功');
        });
    }
    await querydb('DELETE FROM t_product WHERE id = ?', [id]);
        res.redirect('list');
});

module.exports = productRoute;