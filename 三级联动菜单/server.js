const express = require('express')
//1创建app服务对象
const app = express()
app.use(express.static(__dirname+'/public'))

app.get('/test', (req, res) => {
    res.send('我时一些数据')
})

app.listen(3000, (err) => {
    if (!err) console.log('服务器启动成功')
    else console.log('启动失败')
}) 