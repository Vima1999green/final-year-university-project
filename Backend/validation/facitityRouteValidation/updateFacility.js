const validator = require('validator');
const isEmpty = require('../isEmpty');

const validate_UpdateFacilityData = (data) => {
    let errors = {};
    // data.name = !isEmpty(data.name) ? '' : data.name
    // data.description = isEmpty(data.description) ? '' : data.description
    // data.location = isEmpty(data.location) ? '' : data.location
    // data.capacity = isEmpty(data.capacity) ? '' : data.capacity
    // data.rules = isEmpty(data.rules) ? '' : data.rules
    // data.address = isEmpty(data.address) ? '' : data.address

    //validating name
    if (!isEmpty(data.name) && typeof (data.name) === 'string')
        errors.name = 'Facility name is required';

    //validating description
    if (!isEmpty(data.description)) {
        if (typeof (data.description !== 'string'))
            errors.description = 'Description must be a String';
    }

    //validating rules
    if (!isEmpty(data.rules)) {
        if (typeof (data.rules !== 'string'))
            errors.rules = 'Rules must be a String';
    }

    //validating address
    if (!isEmpty(data.address)) {
        if (typeof (data.address !== 'string'))
            errors.address = 'Address must be a String';
    }

    //validating cost
    if (!isEmpty(data.cost)) {
        if (typeof (data.cost !== 'number'))
            errors.cost = 'Cost must be a number';
        else if (data.cost < 0)
            errors.cost = 'Cost cannot be negative';
    }

    //validating capacity
    if (!isEmpty(data.capacity)) {
        if (typeof (data.capacity !== 'string'))
            errors.capacity = 'Capacity must be a String';
    }

    //validating location
    if (!isEmpty(data.location)) {
        const trimmedLocation = data.location.trim().toLowerCase();
        // Check if it starts with a valid protocol
        const isValidProtocol = trimmedLocation.startsWith('http://') || trimmedLocation.startsWith('https://');

        // Check if it contains a valid Google Maps domain
        const isGoogleMapsLink = trimmedLocation.includes('maps.google.com') || trimmedLocation.includes('maps.app.goo.gl');

        if (!isValidProtocol || !isGoogleMapsLink) {
            errors.location = 'Not a valid Google Maps link';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


}

module.exports = validate_UpdateFacilityData;