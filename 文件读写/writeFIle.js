let fs = require('fs')
fs.writeFile(__dirname+'/demo.txt','人家好喜欢你捏',{mode:0o666,flag:'a'},(err) => {
    if(err){
        console.log('文件写入失败',err)
    }else {
        console.log('文件写入成功')
    }
})