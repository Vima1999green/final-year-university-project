const validator = require('validator');
const isEmpty = require('../isEmpty');

const validate_UpdateFacilityData =(data) =>{
    let errors = {};
    data.name = !isEmpty(data.name) ? '' : data.name

    if (validator.isEmpty(data.name))
        errors.name = 'Facility name is required';

    if (!isEmpty(data.cost)){
        if (typeof (data.cost !== 'number'))
            errors.cost = 'Cost must be a number';
        else if (data.cost < 0)
            errors.cost = 'Cost cannot be negative';
    }

    if (!isEmpty(data.capacity)){
        if (typeof (data.capacity !== 'number'))
            errors.capacity = 'Capacity must be a number';
        else if (data.capacity < 0)
            errors.capacity = 'Capacity cannot be negative';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


}

module.exports = validate_UpdateFacilityData;