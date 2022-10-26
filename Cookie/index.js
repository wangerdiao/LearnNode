const express = require('express')
const cookieParser = require('cookie-parser')
//1创建app服务对象
const app = express()
app.use(cookieParser())
//demo路由不对cookie进行任何操作
app.get('/demo', (req, res) => {
    res.send('我是demo路由')
})
//会话cookie，关闭浏览器即刻消失
//demo1路由负责给客户端种下一个会话cookie
app.get('/demo1', (req, res) => {
    //1给客户端种下会话cookie
    //2express中给客户端种cookie不需要任何库
    let obj = {school:'atguigu',subject:'web'}
    res.cookie('peiqi',JSON.stringify(obj))
    res.send('我是demo1路由给你的反馈，我给你种下了【会话cookie】')
})
//demo2路由负责给客户端种下一个持久化cookie
app.get('/demo2', (req, res) => {
    res.cookie('peiqi','hello',{maxAge:1000*30})
    res.send('我是demo2路由给你的反馈，我给你种下了【持久话cookie】')
})
//demo3负责读取客户端所携带过来的cookie
app.get('/demo3', (req, res) => {
    //express中读取客户端携带过来的路由要借助cookie-parser库
    console.log(req.cookies)
    const {peiqi} = req.cookies
    let a = JSON.parse(peiqi)
    console.log(a.school)
    res.send('我是demo3路由，我读取了你携带过来了cookie')
})
//demo4路由负责告诉客户端清除一个cookie
app.get('/demo4', (req, res) => {
    // res.cookie('peiqi','',{maxAge:0})
    res.clearCookie('peiqi')
    res.send('兄弟我删除了你所保存的key为peiqi的cookie')
})
app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功')
    else console.log('启动失败')
}) 