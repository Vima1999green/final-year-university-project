const mongoose = require('mongoose')
const Schema = mongoose.Schema

const facilitySchema = new Schema({
    name:{
        type:String,
        required: [true, 'Facility name is required']
    },
    description:{
        type:String,
        required: [true, 'Facility description is required']
    },
    cost:{
        type:Number,
        required: [true, 'Facility cost is required']
    },
    location:{
        type:String,
        required: [true, 'Facility location is required']
    },
    capacity:{
        type:String,
        required: [true, 'Facility capacity is required']
    },
    images: {
      type: [String],
      required: false,
    },
    rules:{
        type:String,
        required: [true, 'Facility rules is required']
    },
    address:{
        type:String,
        required: [true, 'Facility address is required']
    }
});

const facilityModel=mongoose.model('facility',facilitySchema)
module.exports = facilityModel
