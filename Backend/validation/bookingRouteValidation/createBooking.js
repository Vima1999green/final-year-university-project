const mongoose = require('mongoose')
const validator = require('validator')
const isEmpty = require('../isEmpty')
const validateBookingData = (data) => {
    let errors = {};

    //replace empty,undifined,null objects with string
    data.userID = isEmpty(data.userID) ? '' : data.userID;
    data.organizationName = isEmpty(data.organizationName) ? '' : data.organizationName;
    data.organizationAddress = isEmpty(data.organizationAddress) ? '' : data.organizationAddress;
    data.designation = isEmpty(data.designation) ? '' : data.designation;
    data.facility = isEmpty(data.facility) ? '' : data.facility;
    data.bookingDate = isEmpty(data.bookingDate) ? '' : data.bookingDate;
    data.Time = isEmpty(data.Time) ? '' : data.Time;
    data.status = isEmpty(data.status) ? '' : data.status;
    data.description = isEmpty(data.description) ? '' : data.description;
    data.facilityId = isEmpty(data.facilityId) ? '' : data.facilityId;

    //validate userID
    if (validator.isEmpty(data.userID))
        errors.userID = 'User Id is required';
    else if (!mongoose.Types.ObjectId.isValid(data.userID)) {
        errors.userID = 'Invalid User Id';
    }
    //validate organizationName
    if (validator.isEmpty(data.organizationName))
        errors.organizationname = 'Organization name is required';
    //validate organizationAddress
    if (validator.isEmpty(data.organizationAddress))
        errors.organizationAddress = 'Organization address is required';
    //validate designation
    if (validator.isEmpty(data.designation))
        errors.designation = 'Designation is required';
    //validate facility
    if (validator.isEmpty(data.facility))
        errors.facility = 'Facility is required';


    //validate bookingDate
    if (validator.isEmpty(data.bookingDate))
        errors.bookingDate = 'Booking Date is required';
    //validate time
    if (validator.isEmpty(data.Time))
        errors.Time = 'Booking time is required';
    else {
        
    }


    //validate status
    const validStatusValues = ['pending', 'cancelled', 'approved', 'payment', 'postponed'];
    if (validator.isEmpty(data.status))
        errors.status = 'Status is required';
    else if (!validator.isIn(data.status, validStatusValues)) {
        errors.status = 'Invalid status';
    }
    //validate description
    if (validator.isEmpty(data.description))
        errors.description = 'Description is required';
    //validate facilityId
    if (validator.isEmpty(data.facilityId))
        errors.facilityId = 'Facility Id is required';
    else if (!mongoose.Types.ObjectId.isValid(data.facilityId)) {
        errors.facilityId = 'Invalid User Id';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateBookingData