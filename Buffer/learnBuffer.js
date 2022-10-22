//创一个buffer实例对象------------性能特别差1在堆里开辟空间（可能有人用过）2清理
// let buf = new Buffer(10)
// console.log(buf)

// //创一个buffer实例对象------性能比new Buffer稍强 在堆中开辟没人用过的空间
// let buf2 = Buffer.alloc(10)
// console.log(buf2)

// //创一个buffer实例对象--------性能最好  在堆里开辟空间（可能有人用过）
// /*
// 输出的buffer不是二进制？------输出的16进制，但存储的还是二进制，输出的时候会自动转16进制
// 输出的Buffer不为空？-------在堆里开辟空间，可能残留着别的数据，所以叫做allocUnsafe
// */
// let buf3 = Buffer.allocUnsafe(10)
// console.log(buf3)

//将数据存入一个buffer实例
/*
输出的为什么不是我们曾经存入的字符串？ 用户存储的不一定是字符串，也有可能是媒体类型的文件
如何能够让输出的东西是字符串（我们能看懂的）？ toString()
*/
let buf4 = Buffer.from('刘凯酱')
console.log(buf4)