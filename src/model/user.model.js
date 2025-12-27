const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        // min:4
    },
    email:{
        type : String,
        required:true,
        unique:true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address']
    },
    phone:{
        type:String,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number']

    },
    password:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
},
{
    timestamps:true,
    versionKey:false,
}
)

module.exports = new mongoose.model("User", userSchema )