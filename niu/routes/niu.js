var express = require('express');
var router = express.Router();
var querydb = require('../utils/querydb');

router.get('/index', async function(req, res, next) {
  res.render('index');
});
router.get('/niu', async function(req, res, next) {
  // 查询数据库商品数据
 
  var list = [];
  var categoryData = await querydb('SELECT t_id,t_name FROM t_category');
  for(var i =0; i < categoryData.length; i++){
      var categoryId = categoryData[i].t_id;
      var categoryName = categoryData[i].t_name;
      var productData = await querydb('SELECT id, name,description,price,picture,number FROM t_product WHERE c_id = ?', [categoryId]);
      var product = {
        'categoryId': categoryId,
        'categoryName': categoryName,
        'productList': productData
      };
      list.push(product);
  }
  console.log('data :' + JSON.stringify(list));

  res.render('niu', {
    list: list
  });
});
// res.render('niu1');
// });
//  router.get('/product',async function(req,res,next){
//   var categoryId = req.query.categoryId;
//   var data = await querydb('SELECT id, name,description,price,picture,number FROM t_product WHERE c_id = ?', [categoryId]);
//   res.send(data);
// });
module.exports = router;
