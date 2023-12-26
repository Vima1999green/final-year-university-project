const validator = require('validator');
const isEmpty = require('../isEmpty');

const validateLoginData = (data) => {
    let errors = {};

    data.email = isEmpty(data.email) ? '' : data.email
    data.password = isEmpty(data.password) ? '' : data.password

    if (validator.isEmpty(data.email))
        errors.email = 'Email is required';
    else if (!validator.isEmail(data.email))
        errors.email = 'Invalid email';
    if (validator.isEmpty(data.password))
        errors.password = 'Password is required';

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginData;