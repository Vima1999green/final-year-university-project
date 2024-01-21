const validator = require('validator');
const isEmpty = require('../isEmpty');

const validateFacilityData = (data) => {
    let errors = {};
    data.name = isEmpty(data.name) ? '' : data.name
    data.description = isEmpty(data.description) ? '' : data.description
    data.location = isEmpty(data.location) ? '' : data.location
    data.capacity = isEmpty(data.capacity) ? '' : data.capacity

    if (validator.isEmpty(data.name))
        errors.name = 'Facility name is required';
    if (validator.isEmpty(data.description))
        errors.description = 'Description is required';
    if (validator.isEmpty(data.location))
        errors.location = 'Location is required';
    if (validator.isEmpty(data.capacity))
        errors.capacity = 'Capacity is required';
    //validating cost
    if (isEmpty(data.cost))
        errors.cost = 'Cost is required';
    else if (typeof (data.cost))
        errors.cost = 'Cost must be a number';
    else if (data.cost < 0)
        errors.cost = 'Cost cannot be negative';


    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateFacilityData;