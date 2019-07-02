/**
 * {
 *    method:get,
 *    url: '/login.do',
 *    content: 'username=admin&password=123'
 *    success: functon(e){
 *          
 *    }
 * }
 * @param {*} json 
 */

function myajax(json){
    var xhr = getXHR();

    // 2. 打开连接发送请求
    xhr.open(json.method,json.url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // 请求头部
    xhr.send(json.content);

    // 3. 处理响应
    xhr.onreadystatechange = function (e) {
        // 根据就绪码判断响应是否完成
        if (e.target.readyState === 4) {
            // 根据状态码判断成功失败
            if (e.target.status === 200) {
                // console.log(e.target.responseText);
                // alert('响应内容是 :' + e.target.responseText);
                json.success(e.target.responseText);
            }
        }
    };
}

function ajaxPromise(json) {
    return new Promise(function(resolved,rejected){
        // 1. 获取 XmlHttpRequest
        var xhr = getXHR();

        // 2. 打开连接发送请求
        xhr.open(json.method, json.url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // 请求头部
        xhr.send(json.content);

        // 3. 处理响应
        xhr.onreadystatechange = function (e) {
            // 根据就绪码判断响应是否完成
            if (e.target.readyState === 4) {
                // 根据状态码判断成功失败
                if (e.target.status === 200) {
                    resolved(e.target.responseText);
                }else{
                    rejected('响应出错! 错误码: '+e.target.status);
                }
            }
        };
    });
}

    function getXHR() {
        if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest;
        } else {
            // 兼容IE浏览器低版本
            new window.AtiveXObject('Microsoft.XMLHTTP');
        }
    }