const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookingSchema = new Schema({

    userID: {
        type: mongoose.ObjectId,
        required: [true, 'User id is required']
    },

    userNICImg:{
        type:String
    },

    organizationName: {
        type: String,
        required: [true, 'Organization name is required']
    },

    organizationAddress: {
        type: String,
        required: [true, 'organization address is required']
    },

    designation: {
        type: String,
        required: [true, 'Designation is required']
    },

    facility: {
        type: String,
        required: [true, 'Facility is required']
    },
    bookingDate: {
        type: [Date],
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
    description: {
        type: String
    },
    facilityId: {
        type: mongoose.ObjectId,
        required: [true, 'Facility Id is required']
    },
    deleteRequested: {
        type: Boolean,
        default: false
    },

    postponeRequested: {
        type: Boolean,
        default: false

    },
    permissionLetter:{
        type:String
    }
}, { timestamps: true })


const bookingModel = mongoose.model('booking', bookingSchema)
module.exports = bookingModel
