const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}))
app.get('/ajax_get',(req,res) => {
    console.log(req.query)
    res.setHeader('Access-Control-Allow-Origin','*')//第一个参数解决跨域，第二个参数是允许路径访问服务器
    res.send('ajax_get请求接受成功')
})
app.post('/ajax_post',(req,res) => {
    console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Expose-Headers','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.send('ajax_post请求接受成功')
})

app.listen(3000,(err) => {
    if(!err) console.log('服务器启动成功')
    else console.log('启动失败')
})