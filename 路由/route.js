let express = require('express')
let app = express()
app.get('/',(req,res) => {
    console.log(req.get('Host'))
    console.log(req.get('Referer'))
    res.send('我是根路由----get')
})
app.get('/demo/:id',(req,res) => {
    console.log(req.params)
    res.send('我是demo')
})
app.get('/meishi/test',(req,res) => {
    res.send('我是test')
})
app.post('/',(req,res) => {
    console.log(req.body) //需要借助中间件
    res.send('我是post路由')
})
app.get('/download',(req,res) => {
    // res.download('./zuoye.zip')
    // res.sendFile(__dirname+'/public/index.html')
    // res.redirect('https://www.baidu.com')
    // res.redirect('/meishi/test')
    res.set('id','111')
    res.send('我是根路由----download')
    console.log(res.get('id'))


})
app.listen(3000,(err) => {
    if(err) console.log('启动失败')
    else console.log('启动成功')
})  