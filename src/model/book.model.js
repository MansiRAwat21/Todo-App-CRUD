const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        require: true,
        min: [2, 'book name atleast more then 2 character'],
        max: 15,
        unique: true
    },
    genre: {
        type: String,
        enum: { values: ['love', 'horror', 'action', 'thriller'], }
    },
    author: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default:true
    },    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model("Book", bookSchema)