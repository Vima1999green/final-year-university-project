const validator = require('validator');
const isEmpty = require('../isEmpty');

const validateUpdateData = (data) => {
    let errors = {};

    //validating userType
    if (!isEmpty(data.userType)) {
        errors.userType = 'You can not change user type'
    }
    //validatin First Name
    if (!isEmpty(data.firstName) && typeof (data.firstName) === 'string') {
        if (validator.isEmpty(data.firstName))
            errors.firstName = 'First name is required'
        else if (!validator.isLength(data.firstName, { min: 2, max: 30 }))
            errors.firstName = 'First name must be 2 and 30 characters';
        else if (!validator.isAlpha(data.firstName))
            errors.firstName = 'First name cannot contain numbers';
    }

    //validating last name
    if (!isEmpty(data.lastName) && typeof (data.lastName) === 'string') {
        if (validator.isEmpty(data.lastName))
            errors.lastName = 'Last name is required'
        else if (!validator.isLength(data.lastName, { min: 2, max: 30 }))
            errors.lastName = 'Last name must be 2 and 30 characters';
        else if (!validator.isAlpha(data.lastName))
            errors.lastName = 'Last name cannot contain numbers';
    }

    //validating email
    if (!isEmpty(data.email) && typeof (data.email) === 'string') {
        if (validator.isEmpty(data.email))
            errors.email = 'Email is required'
        else if (!validator.isEmail(data.email))
            errors.email = 'Invalid email';
    }

    //validating password
    if (!isEmpty(data.password) && typeof (data.password) === 'string') {
        if (validator.isEmpty(data.password))
            errors.password = 'Password is required'
        else if (!validator.isLength(data.password, { min: 6, max: 12 }))
            errors.password = 'Password must be 6 and 12 characters';
    }
    //validating universityEmail
    if (!isEmpty(data.unversityEmail) && typeof (data.unversityEmail) === 'string') {
        if (validator.isEmpty(data.unversityEmail))
            errors.email = 'University email is required'
        else if (!validator.isEmail(data.unversityEmail))
            errors.email = 'Invalid email';
    }
    //validating universityID
    if (!isEmpty(data.unversityID) && typeof (data.unversityID) === 'string') {
        if (validator.isEmpty(data.unversityID))
            errors.email = 'University ID is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateUpdateData;
