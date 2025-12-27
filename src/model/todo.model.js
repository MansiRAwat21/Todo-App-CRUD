const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:[2, 'title atleast more then 2 character']
    },
    description:{
        type:String,
    },
    // is_private :{
    //     type:Boolean,
    //     required:true,
    //     default:false
    // },
    status:{
        type:String,
        enum:['pending','completed']
    },
    priority:{
        type:String,
        enum:['low','medium','high']
    },
    due_at :{
        type:Date,
        default:Date.now
    },
    category:{
        type:String,
        required:true
    },
    owner_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true,
})

module.exports = new mongoose.model("Todo",todoSchema)