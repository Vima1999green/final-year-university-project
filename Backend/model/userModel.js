const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Your First Name must be required']
    },
    lastName: {
        type: String,
        required: [true, 'Your Last Name must be required']
    },
    email: {
        type: String,
        required: [true, 'Your email Name must be required']
    },

    isEmailVerified: {
        type: Boolean,
        required: [true, 'your need to verified']
    },
    confirmationCode: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: [true, 'please enter password']
    },
    userType: {
        type: String,
        required: [true, 'User Type  must be required']
    },
    universityID: {
        type: String,
        required: function () {
            return this.userType === 'university'
        }
    },
    universityEmail: {
        type: String,
        required: function () {
            return this.userType === 'university'
        }
    }
}
)

// Add a pre-save hook to exclude university data when userType is 'guest'
userSchema.pre('save', next=> {
    if (this.userType === 'guest') {
        this.universityID = undefined;
        this.universityEmail = undefined;
    }
    next();
});

const userModel = mongoose.model('user', userSchema)




module.exports = userModel
