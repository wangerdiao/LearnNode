/*
搭建node原生服务器，不借助第三方库
*/
let http = require('http') //引入node内置的http模块
//引用的qs是一个对象，有很多方法,最具代表性的是parse()
let qs = require('querystring')    //引入用于解析key=value&key=value(查询字符串)urlencoded编码形式的字符串转换为js中对象
//1创造一个服务员-------创建服务对象
let server = http.createServer((request, response) => {
    /*
    request:请求对象，里面包含客户端给服务器的东西
    response:响应对象，里面包含着服务器给客户端的东西
    */
    let params = request.url.split('?')[1]  //name=liukai&age=18
    let paramsObj = qs.parse(params) // {name:"liukai",age:18}
    let { name, age } = paramsObj
    response.setHeader('content-type', 'text/html;charset=utf-8')

    response.end(`你好${name}，我的年龄是${age}`)
})
//指定服务器运行的端口号
server.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功')
    else console.log('启动失败')
})
//2让服务员干活,获取客人点菜单，联系后厨做菜
