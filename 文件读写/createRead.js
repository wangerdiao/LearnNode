let fs = require('fs')
//创建一个可读流
let rs = fs.createReadStream(__dirname+'/demo.txt')
let ws = fs.createWriteStream('../test.txt')
//只要用到流，就必须监测流的状态
rs.on('open',function() {
    console.log('可读流开始了')
})
rs.on('close',function() {
    console.log('可读流结束了')
    ws.close()
})
ws.on('open',() => {
    console.log('可写流打开了')
})
ws.on('close',() => {
    console.log('可写流关闭了')
})
//给可读流绑定data事件，会触发可读流自动读取内容
rs.on('data',function(data) {
    //buffer实例的length属性，是表示该buffer实例占用内存空间的大小
    console.log(data.length) //每次最大输出65536，及每次最大读取64kb的内容
    ws.write(data)
    // ws.close()  这里关闭可写流导致只读取了一次内容写了一次内容就关闭了可写流
})
// ws.close() 注意这里关闭可写流会导致可读流还没开启可写流就已经关闭