var mysql = require('mysql'); // 引入mysql包

/**
 * 封装通用数据库操作函数
 */
function query(sql, param,callFunction) {
    //1. 配置数据库连接参数,创建连接对象
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'b123',
        database: 'niumanager'
    });
    //1. 建立连接
    connection.connect();

    // 2. 发送SQL语句到mysql服务端执行
    connection.query(sql, param, callFunction);

    // 3. 关闭连接
    connection.end();
}

module.exports = query;