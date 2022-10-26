const express = require('express')
//引入db模块用于连接数据库
const db = require('./db/db')
//引入UI路由器
const UIRouter = require('./Router/UIRouter')
//引入login路由器
const  loginRegisterRouter = require('./Router/loginRegisterRouter')
const app = express()
//引入配置express中操作session,在express中简化操作session
const session = require('express-session')
//引入connect-mongo，用于做session持久化存储
const MongoStore = require('connect-mongo')
app.use(session({
    name:'myCookie',//设置cookie的name,默认值是connect.sid
    secret:'wangdadiao',//参与加密的字符串(又称为签名)
    saveUninitialized:false,//是否在存储内容之前创建session会话
    resave:true,//是否在每次请求之前，强制重新保存session，即使没有变化（保险）
    store: new MongoStore({
        mongoUrl:'mongodb://localhost:27017/sessions_container',
        touchAfter:24*3600//修改频率(在24小时之内只更新一次)
    }),
    cookie:{
        httpOnly:true,//开启后前端无法通过js操作cookie
        maxAge:1000*30 // 设置cookie的过期时间
    }
}))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
//配置模板引擎
app.set('view engine','ejs')
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
