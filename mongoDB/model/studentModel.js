let mongoose = require('mongoose')
    //把数据库相成你的别墅
    //1.1请来一个帮你看门的人----引入模式对象
    let Schema = mongoose.Schema
    //1.2制定进入你家的规则-----创建约束对象
    let studentsRule = new Schema({
        stu_id:{
            type:String, //限制学号为字符串
            required:true,//限制学号为必填项
            unique:true,//限制学号唯一
        },
        name:{
            type:String, //限制姓名为字符串
            required:true,//限制姓名为必填项
        },
        age:{
            type:Number, //限制年龄为整型
            required:true,//限制年龄为必填项
        },
        sex:{
            type:String, //限制性别为字符串
            required:true,//限制性别为必填项
        },
        hobby:[String], //限制爱好只能为数组，数组中每一项要为字符串
        info:Schema.Types.Mixed, //接受所有类型
        date:{ //用户创建时间
            type:Date,
            default:Date.now()
        },
        enable_flag:{ //用户注销的标志
            type:String,
            default:'Y'
        }
    })
    //1.3告诉保安你的规则-------创建模型对象
    let studentsModel = mongoose.model('students',studentsRule) //用于生成某个集合所对应模型对象
module.exports = studentsModel //暴露模型对象