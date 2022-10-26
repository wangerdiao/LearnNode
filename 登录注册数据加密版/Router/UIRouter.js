//专门用于展示界面的路由
const {Router} = require('express') //引入Router构造函数
const cookieParser = require('cookie-parser')
//创建一个路由器（路由器就是一个小型的app）
const router = new Router()
//引入path模块----node中内置专门解决路径问题的库
let path = require('path')
const usersModel = require('../model/users')
router.use(cookieParser())

//用于展示页面的路由，没有其他逻辑--UI路由
router.get('/login', (req, res) => {
    // let url = path.resolve(__dirname,'../public/login.html')
    // res.sendFile(url)
    //这里可以不需要public/login.html文件，直接使用ejs文件
    //接受注册成功的时候传递过来的email参数
    const {email} = req.query
    res.render('haha/login',{errMsg:{email}})
})
//用于展示页面的路由
router.get('/register', (req, res) => {
    // let url = path.resolve(__dirname,'../public/register.html')
    // res.sendFile(url)
    res.render('haha/register',{errMsg:{}})
})
//个人中心页面的路由
router.get('/usercenter', (req, res) => {
    //1获取客户端通过cookie携带过来的session编号
    //2根据容器编号匹配容器session
    //3匹配上：拿到session容器里的数据
    //4没匹配上：驳回，去登录
    const {_id} = req.session //req携带过来的是cookie;{key,value经过加密的编号}
    if(_id) {
        //去数据库中查找是否有此id
        usersModel.findOne({_id},(err,data) => {
            if(!err && data) { //用户携带了ID且在数据库中查到了此id
                res.render('haha/userCenter',{nick_name:data.nick_name})
            }else {//与数据库交互产生错误，用户非法篡改了cookie
                res.redirect('http://localhost:3000/login')
            }
        })
    }else { //进入此处1用户cookie过期2用户清理了缓存3用户没有登录直接进入了个人中心
        res.redirect('http://localhost:3000/login')
    }
})
//为了实现node中中间件是一个函数的理念，需要暴露一个函数，在服务器上用app.use()调用这个函数
module.exports = () => {
    return router
}