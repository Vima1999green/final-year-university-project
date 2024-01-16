const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blacklistSchema = new Schema({
    token: {
        type: String,
        required: [true, 'Your First Name must be required']
    }
})


const userModel = mongoose.model('blacklist', blacklistSchema)
module.exports = userModel
