const mongoose = require('mongoose')
const validator = require('validator')
const isEmpty = require('../isEmpty')
const Booking = require('../../model/bookingModel');

const validateUpdateBookingData=(data)=>{
        let errors = {};



        //validating bookingDate

        if(!isEmpty(data.bookingDate)){
                if(validator.isEmpty(data.bookingDate))
                        errors.bookingDate = 'Booking date is required';
        }

        //validating Time
        if(!isEmpty(data.Time)){
            if(validator.isEmpty(data.Time))
                    errors.Time = 'Time is required';
        }

        //validating booking status

        if(isEmpty(data.status)){
            errors.status = 'Status is required';

        }else if(!['pending', 'cancelled', 'approved', 'payment', 'postponed'].includes(data.status)){
                errors.status='Invalid booking status';
            }
        

        return{
            errors,
            isValid:isEmpty(errors)
        }
}


module.exports = validateUpdateBookingData