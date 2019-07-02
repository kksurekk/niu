var query = require('../config/dbconnect');

function querydb(sql, param) {
    // 初始化promise
    var promise = new Promise(function (resovled, rejected) {
        // 保存信息到数据库
        query(sql, param, function (err, data) {
            if (err) {
                rejected(err);
                return;
            }
            resovled(data);
        });
    });
    return promise;
}

module.exports = querydb;