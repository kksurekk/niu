var express = require('express');
var categoryRoute = express.Router();
var querydb = require('../utils/querydb');
/**
 * 类别添加
 */
categoryRoute.get('/add',function(req,res){
    res.render('category/add');
});
/**
 * 类别添加提交
 */
categoryRoute.post('/add',async function(req,res){
    var categoryname = req.body.categoryname;
    var sql = 'INSERT INTO t_category (t_name) VALUES (?)';
    var param = [categoryname];
    await querydb(sql,param);
    res.redirect('/category/list');
});

/**
 * 分类列表
 */
categoryRoute.get('/list',async function(req,res){
    // var sql = 'SELECT t_id,t_name FROM t_category';
    // var data = await querydb(sql);
    // console.log(data);
    // res.render('category/list',{list:data});
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
    var sql = 'SELECT t_id,t_name FROM t_category LIMIT ?, ?';
    var param = [start,pageSize];
    try{
        var data = await querydb(sql,param);
        res.render('category/list', {
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
 * 分类修改
 */
categoryRoute.get('/update',async function(req,res){
    var id = req.query.id;
    var sql = 'SELECT t_id,t_name FROM t_category WHERE t_id=?';
    var param = [id];
    var data = await querydb(sql,param);
    res.render('category/update',data[0]);
});
/**
 * 修改提交
 */
categoryRoute.post('/update',async function(req,res){
    var id = req.body.id;
    var categoryName = req.body.categoryName;
    var sql = 'UPDATE t_category SET t_name=? WHERE t_id =?';
    var param = [categoryName,id];
    await querydb(sql,param);
    res.redirect('list'); // 重定向

});
  /**
 * 删除
 */
categoryRoute.get('/delete',async function(req,res){
    var id = req.query.id;
    var sql = 'DELETE FROM t_category WHERE t_id = ?';
    var param = [id];
    await querydb(sql,param);
    res.redirect('list');
});

module.exports = categoryRoute;