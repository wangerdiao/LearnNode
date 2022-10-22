let fs = require('fs')
//创建一个可写流
let ws = fs.createWriteStream(__dirname+'/demo.txt')
//只要用到流，就必须监测流的状态
ws.on('open',() => {
    console.log('可写流打开了')
})
ws.on('close',() => {
    console.log('可写流关闭了')
})
//使用可写流写入数据
ws.write('刘凯\n')
ws.write('欧尼酱\n')
ws.close() //如果在node8版本中此方法会造成数据丢失
//ws.end() 在node8版本中用end方法关闭流