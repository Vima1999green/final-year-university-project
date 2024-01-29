const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({
    bookingDate: {
        type: Date,
        required: [true, 'Booking date is required']
    },
    Time: {
        type: String,
        required: [true, 'Booking time is required']
    },
    status: {
        type: String,
        required: [true, 'Booking status is required']
    },
    comments: {
        type: String
    },
    facilityId: {
        type: mongoose.ObjectId,
        required: [true, 'Facility Id is required']
    },
})


const bookingModel = mongoose.model('blacklist', bookingSchema)
module.exports = bookingModel
