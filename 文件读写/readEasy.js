let fs = require('fs')
fs.readFile(__dirname+'/demo.txt',function(err,data) {
    if(err) console.log(err)
    else  { //如果读取成功就在上一级目录写入test文件，内容是读取的内容
        console.log(data)
        fs.writeFile('../test.txt',data,function(err) {
            if(err) console.log(err)
        else  console.log('success')
    })
    }
    //为什么读取的是buffer的格式？  因为用户存储的不一定是纯文本的格式
})