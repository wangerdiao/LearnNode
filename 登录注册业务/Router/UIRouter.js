//专门用于展示界面的路由
const {Router} = require('express') //引入Router构造函数
//创建一个路由器（路由器就是一个小型的app）
const router = new Router()
//引入path模块----node中内置专门解决路径问题的库
let path = require('path')

router.get('/', (req, res) => {
    res.send('我是主页')
})
//用于展示页面的路由，没有其他逻辑--UI路由
router.get('/login', (req, res) => {
    let url = path.resolve(__dirname,'../public/login.html')
    res.sendFile(url)
})
//用于展示页面的路由
router.get('/register', (req, res) => {
    let url = path.resolve(__dirname,'../public/register.html')
    res.sendFile(url)
})
//为了实现node中中间件是一个函数的理念，需要暴露一个函数，在服务器上用app.use()调用这个函数
module.exports = () => {
    return router
}