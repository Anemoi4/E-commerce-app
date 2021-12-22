const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    address: {
        type: String,
    },
    zip: {
        type: Number
    }
})

const User = mongoose.model('user', userSchema)
module.exports = User