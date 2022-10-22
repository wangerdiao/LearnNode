const bodyParser = require('body-parser')
const express = require('express')
const app = express()

//第一种使用全局中间件------所有请求的第一扇门
// app.use((req,res,next) => {
//     // res.send('我是中间件的响应')
//     /*
//     1过滤些不合法的请求,例如图片防盗链
//        if(req.get('Referer')) {
//          let origin = req.get('Referer').split('/')[2]
//         if(origin === '127.0.0.1:5500') {
//              next()
//          } else { //发生了防盗链
//              res.send('别偷图')
//          }
//         }else {
//             next()
//     }
//         res.demo = 1 修改请求对象
//     2
//     */
//     next() //放行
// })

// function guardPic (req,res,next) {
//            if(req.get('Referer')) {
//          let origin = req.get('Referer').split('/')[2]
//         if(origin === '127.0.0.1:5500') {
//              next()
//          } else { //发生了防盗链
//              res.send('别偷图')
//          }
//         }else {
//             next()
//     }
// } //第二种全局中间件的方式---更加灵活，不是第一扇门，可以在任何需要的地方使用

// app.use(bodyParser.urlencoded({extended:true}))
//使用第三方中间件body-parser
//解析post请求请求体中的参数为一个对象，随后挂载到request对象上


app.use(express.urlencoded({extended:true}))
//使用内置中间件暴露静态资源----一次性把所指定的文件夹内的资源全部交出去
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res) => {
    res.send('ok')
})
app.get('/demo',(req,res) => {
    res.send('我是demo')
})
// app.get('/picture',guardPic,(req,res) => {
//     res.sendFile(__dirname+'/public/1.jpg')
// })
app.post('/test',(req,res) => {
    console.log(req.body)
    res.send('ok')
})

app.listen(3000,(err) => {
    if(err) console.log('启动失败')
    else console.log('启动成功')
})