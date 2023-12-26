const validator = require('validator');
const isEmpty = require('../isEmpty');

const validateUpdateData = (data) => {
    let errors = {};

    //validating userType
    if (!isEmpty(data.userType) || typeof (data.userType) === 'string') {
        if (validator.isEmpty(data.userType))
            errors.userType = 'User type is required'
        else if (data.userType === 'university') {
            //validating universityEmail and universityID
            data.universityEmail = isEmpty(data.universityEmail) ? '' : data.universityEmail;
            data.universityID = isEmpty(data.universityID) ? '' : data.universityID;
            if (
                validator.isEmpty(data.universityEmail) ||
                validator.isEmpty(data.universityID))
                errors.error = 'University details are required';
            else if (!validator.isEmail(data.universityEmail))
                errors.universityEmail = 'Invalid email'

        }
        else if (!['admin', 'director', 'DVC', 'guest'].includes(data.userType)) {
            errors.userType = 'Not a valid userType'
        }
    }

    //validatin First Name
    if (!isEmpty(data.firstName) || typeof (data.firstName) === 'string') {
        if (validator.isEmpty(data.firstName))
            errors.firstName = 'First name is required'
        else if (!validator.isLength(data.firstName, { min: 2, max: 30 }))
            errors.firstName = 'First name must be 2 and 30 characters';
        else if (!validator.isAlpha(data.firstName))
            errors.firstName = 'First name cannot contain numbers';
    }

    //validating last name
    if (!isEmpty(data.lastName) || typeof (data.lastName) === 'string') {
        if (validator.isEmpty(data.lastName))
            errors.lastName = 'Last name is required'
        else if (!validator.isLength(data.lastName, { min: 2, max: 30 }))
            errors.lastName = 'Last name must be 2 and 30 characters';
        else if (!validator.isAlpha(data.lastName))
            errors.lastName = 'Last name cannot contain numbers';
    }

    //validating email
    if (!isEmpty(data.email) || typeof (data.email) === 'string') {
        if (validator.isEmpty(data.email))
            errors.email = 'Email is required'
        else if (!validator.isEmail(data.email))
            errors.email = 'Invalid email';
    }

    //validating password
    if (!isEmpty(data.password) || typeof (data.password) === 'string') {
        if (validator.isEmpty(data.password))
            errors.password = 'Password is required'
        else if (!validator.isLength(data.password, { min: 6, max: 12 }))
            errors.password = 'Password must be 6 and 12 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateUpdateData;