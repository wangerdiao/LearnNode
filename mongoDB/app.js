//1引入mongose库
let mongoose = require('mongoose')
//2引入数据库连接模块
let db = require('./db/db')
//3引入学生模型
let studentsModel = require('./model/studentModel')
//引入老师模型
let teachersModel = require('./model/teacherModel')

//判断数据库连接成功还是失败，利用两个回调函数来进行判断
db(function (err) {
    if(err) console.log('数据库连接失败')
    //进行CRUD的操作
    else {
        //3操作数据库
        // studentsModel.findOne({name:'孙睿'},{age:1,_id:0},function(err,data) {
        // if(err)  console.log(err)
        // else console.log(data)
        // })
        teachersModel.create({
            stu_id:'001',
            name:'张征',
            age:40,
            sex:'男',
            hobby:['装'], //限制爱好只能为数组，数组中每一项要为字符串
            info:'一个pig', //接受所有类型
        },function(err,data) {
            if(err)  console.log(err)
            else console.log(data)
            })
    }
})
