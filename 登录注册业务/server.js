const express = require('express')
//引入db模块用于连接数据库
const db = require('./db/db')
//引入模型对象，进行CRUD
const usersModel = require('./model/users')
const app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
db(function (err) {
    if(err) console.log('数据库连接失败')
//如果数据库启动成功，随后立即启动服务器再整个过程中无论请求多少次，数据库只连接一次
    else {
        app.get('/',(req,res) => {
            res.send('我是主页')
        })
        //用于展示页面的路由，没有其他逻辑--UI路由
        app.get('/login',(req,res) => {
            res.sendFile(__dirname+'/public/login.html')
        })
        //用于展示页面的路由
        app.get('/register',(req,res) => {
            res.sendFile(__dirname+'/public/register.html')
        })
        //处理用户的登录请求,有很多业务逻辑--业务路由
        app.post('/register',(req,res) => {
            //1获取用户的输入
            /*
            {
                email: '2504204375@qq.com',
                nick_name: '1',
                password: '1',
                re_password: '1'
                }
            */
            const {email,nick_name,password,re_password} = req.body
            //2校验数据的合法性
            /**
             *  2.1校验成功
             *        --去数据库中查找该邮箱是否注册过
             *              ---注册过：提示用户邮箱被占用
             *              ---没注册过：写入数据库
             *  2.2校验失败
             *     提示用户哪里输入的不正确
             */
            const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/ //校验邮件正则
            const nick_nameReg =/[\u4e00-\u9fa5]/gm 
            const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
            //正则校验
            if(!emailReg.test(email)) {
                res.send('邮箱格式不合法，用户名必须4-20位，主机名必须2-10位')
            }else if(!nick_nameReg.test(nick_name)) {
                res.send('昵称格式不合法，必须为中文')
            }else if(!passwordReg.test(password)) {
                res.send('密码格式不合法，必须6-20为')
            }else if(re_password!==password) {
                res.send('两次密码不一致')
            }else { //校验通过去数据库中查找邮箱是否注册过
                usersModel.findOne({email},(err,data) => {
                    if(data) res.send('该邮箱已经被注册')
                    else {
                        usersModel.create({email,nick_name,password,re_password},(err,data) => {
                            if(!err) res.send('注册成功')
                            else {
                                console.log(err)
                                res.send('注册失败')
                            }
                        })
                    }
                })
            }
        })
        app.listen(3000,(err) => {
            if(!err) console.log('启动成功')
            else console.log('启动失败')
        })
    }
})
