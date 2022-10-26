const express = require('express')
//1创建app服务对象
const app = express()
//让你的服务器知道你在用哪一个模板引擎---配置模板引擎
app.set('view engine','ejs')
//让服务器知道你的模板在哪个目录下---配置模板目录
// app.set('views','./haha')
//如果在express中基于node搭建的服务器，使用ejs无需引入
app.get('/show', (req, res) => {
    let personArr = [
        {name:'张三',age:18},
        {name:'李四',age:20},
        {name:'王五',age:21}
    ]
    res.render('haha/person',{persons:personArr}) //ejs可以省略
})

app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功')
    else console.log('启动失败')
}) 