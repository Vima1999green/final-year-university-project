const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateRegisterData = (data) => {
    let errors = {};

    if (!validator.isLength(data.firstName, { min: 2, max: 30 }))
        errors.firstName = 'First name must be 2 and 30 characters';
    if (!validator.isLength(data.lastName, { min: 2, max: 30 }))
        errors.lastName = 'Last name must be 2 and 30 characters';
    if (!validator.isEmail(data.email))
        errors.email = 'Invalid email';
    if (!validator.isLength(data.password, { min: 6, max: 12 }))
        errors.password = 'Password must be 6 and 12 characters';
    if (!validator.isAlpha(data.firstName))
        errors.firstName = 'First name cannot contain numbers';
    if (!validator.isAlpha(data.lastName))
        errors.lastName = 'Last name cannot contain numbers';
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterData;