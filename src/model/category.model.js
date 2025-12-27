const mongoose= require("mongoose");

const categorySchema = new mongoose.Schema({
    categotyName:{
        type:String,
        required:true
    },
    categoryType:{
        type:Array,        
    },
    description:{
        type:String
    },
    isActive:{
        type:Boolean
    }
},{
    timestamps:true
})

module.exports = new mongoose.model('Category',categorySchema)