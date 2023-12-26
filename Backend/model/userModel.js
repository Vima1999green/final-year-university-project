const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const userSchema  = new Schema(
    {
        firstName:{
            type:String,
            required:[true,'Your First Name must be required']
    
    
        },
    
        lastName:{
            type:String,
            required:[true,'Your Last Name must be required']
        },
    
        email:{
            type:String,
            required:[true,'Your email Name must be required']
        },
    
        password:{
            type:String,
            required:[true,'please enter password']
        },
    
        userType:{
            type:String,
            required:[true,'User Type  must be required']
        },
    
        universityID:{
            type:String
            
        },
        universityEmail:{
            type:String
            
        }

    },{timestamps:true}
)

const User  = mongoose.model('User',userSchema)

module.exports = User