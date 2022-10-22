let mongoose = require('mongoose')
    //把数据库相成你的别墅
    //1.1请来一个帮你看门的人----引入模式对象
    let Schema = mongoose.Schema
    //1.2制定进入你家的规则-----创建约束对象
    let usersRule = new Schema({
        email:{
            type:String, 
            required:true,
            unique:true,
        },
        nick_name:{
            type:String, 
            required:true,
        },
        password:{
            type:String, 
            required:true,
        },
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
    let usersModel = mongoose.model('users',usersRule) //用于生成某个集合所对应模型对象
module.exports = usersModel //暴露模型对象