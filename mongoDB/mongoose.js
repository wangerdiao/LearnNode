let mongoose = require('mongoose')
//1连接数据库
mongoose.connect('mongodb://localhost:27017/demo')
//2绑定数据库连接的监听
mongoose.connection.on('open',function(err)  {
    if(err) console.log('数据库连接失败',err)
    else console.log('数据库连接成功')
    //3操作数据库
    console.log('操作数据库')
})
