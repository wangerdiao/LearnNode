const express = require('express')
//引入db模块用于连接数据库
const db = require('./db/db')
//引入UI路由器
const UIRouter = require('./Router/UIRouter')
//引入login路由器
const  loginRegisterRouter = require('./Router/loginRegisterRouter')
const app = express()
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
db(function (err) {
    if (err) console.log('数据库连接失败')
    //如果数据库启动成功，随后立即启动服务器再整个过程中无论请求多少次，数据库只连接一次
    else {
        //处理用户的注册请求,有很多业务逻辑--业务路由
        app.use(UIRouter()) //使用UI路由
        app.use(loginRegisterRouter()) //使用登录注册路由
        app.listen(3000, (err) => {
            if (!err) console.log('启动成功')
            else console.log('启动失败')
        })
    }
})
