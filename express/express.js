const express = require('express')
//1创建app服务对象
const app = express()
app.disable('x-powered-by')//禁止服务器响应X-Powered-By
//2配置路由------对请求url进行分类，服务器根据分类决定交给谁去处理 
//路由可以理解为key:value的形式 key:请求方式+URI路径   value:回调函数
//当有重复的路由是，优先访问上一个路由
app.get('/', (req, res) => {
    console.log(req.query)
    res.send('我是主页')
})
app.get('/meishi', (req, res) => {
    res.send('我是美食页面')
})

app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功')
    else console.log('启动失败')
}) 