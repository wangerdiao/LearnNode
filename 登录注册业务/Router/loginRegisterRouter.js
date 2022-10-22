//专门管理登录注册的业务路由
const {Router} = require('express') //引入Router构造函数
//创建一个路由器（路由器就是一个小型的app）
const router = new Router()
//引入模型对象进行CRUD
const usersModel = require('../model/users')

router.post('/register', (req, res) => {
    //1获取用户的输入
    /*
    {
        email: '2504204375@qq.com',
        nick_name: '1',
        password: '1',
        re_password: '1'
        }
    */
    const { email, nick_name, password, re_password } = req.body
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
    const nick_nameReg = /[\u4e00-\u9fa5]/gm
    const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
    //正则校验
    if (!emailReg.test(email)) {
        res.send('邮箱格式不合法，用户名必须4-20位，主机名必须2-10位')
    } else if (!nick_nameReg.test(nick_name)) {
        res.send('昵称格式不合法，必须为中文')
    } else if (!passwordReg.test(password)) {
        res.send('密码格式不合法，必须6-20为')
    } else if (re_password !== password) {
        res.send('两次密码不一致')
    } else { //校验通过去数据库中查找邮箱是否注册过
        usersModel.findOne({ email }, (err, data) => {
            if (data){
                res.send('该邮箱已经被注册')
                //为安全性考虑，这里要放计数器，失败了定义次数要通知程序员
                console.log(`用户${email}注册失败，邮箱已经存在`)
            }
            else {
                usersModel.create({ email, nick_name, password, re_password }, (err, data) => {
                    if (!err) {
                        res.send('注册成功')
                        console.log(`用户${email}注册成功`)
                    }
                    else {
                        console.log(err)
                        res.send('注册失败')
                    }
                })
            }
        })
    }
})
//处理用户的登录请求,有很多业务逻辑--业务路由
router.post('/login', (req, res) => {
    //1获取输入
    const {email,password} = req.body
    //2校验数据
    const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/ //校验邮件正则
    const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
    if(!emailReg.test(email)) {
        res.send('登录失败，邮箱格式不正确')
    }else if(!passwordReg.test(password)) {
        res.send('登录失败，密码格式不正确')
    }else { //3去数据库中查找（1）有结果登录成功(2)无结果登陆失败
        usersModel.findOne({email,password},(err,data) => {
            if(err) {
                res.send('网路不稳定稍后重试')
                console.log(err)
                return 
            }
            if(data) {
                res.redirect('https://www.baidu.com')
            } else {
                res.send('用户或密码错误')
            }
        })
    }
   
})
module.exports = () => {
    return router
}