const validator = require('validator');
const isEmpty = require('../isEmpty');
const Facility = require('../../model/facilityModel');

const validateFacilityData = async (data) => {
    let errors = {};
    data.name = isEmpty(data.name) ? '' : data.name
    data.description = isEmpty(data.description) ? '' : data.description
    data.location = isEmpty(data.location) ? '' : data.location
    data.capacity = isEmpty(data.capacity) ? '' : data.capacity
    data.rules = isEmpty(data.rules) ? '' : data.rules
    data.address = isEmpty(data.address) ? '' : data.address
    data.cost = isEmpty(data.cost) ? '' : data.cost.toString()
    
    //validating name
    if (validator.isEmpty(data.name))
        errors.name = 'Facility name is required';
    else{
        const existingFacility=await Facility.find(
            {
                $and:[
                    {
                        name:data.name
                    },
                    {
                        _id: { $ne: data.id }
                    }
                ]
            })
        if(!isEmpty(existingFacility)){
            errors.name='Facility is already exists'}
    }
    //validating description
    if (validator.isEmpty(data.description))
        errors.description = 'Description is required';
    //validating capacity
    if (validator.isEmpty(data.capacity))
        errors.capacity = 'Location is required';
    //validating rules
    if (validator.isEmpty(data.rules))
        errors.rules = 'Rules are required';
    //validating address
    if (validator.isEmpty(data.address))
        errors.address = 'Address is required';
    //validating location
    // const googleMapsPattern = /^https?:\/\/(www\.)?google\.com\/maps\/.*$/;// Google Maps link regex pattern
    // console.log(data.location)
    // console.log(googleMapsPattern.test(data.location))
    if (validator.isEmpty(data.location))
        errors.location = 'Location is required';
    // else if (!googleMapsPattern.test(data.location))
    //     errors.location = 'Not a valid google map link';
    // else {
    //     const trimmedLocation = data.location.trim().toLowerCase();
    //     // Check if it starts with a valid protocol
    //     const isValidProtocol = trimmedLocation.startsWith('http://') || trimmedLocation.startsWith('https://');

    //     // Check if it contains a valid Google Maps domain
    //     const isGoogleMapsLink = trimmedLocation.includes('maps.google.com') || trimmedLocation.includes('maps.app.goo.gl');

    //     if (!isValidProtocol || !isGoogleMapsLink) {
    //         errors.location = 'Not a valid Google Maps link';
    //     }
    // }

    //validating cost
    if (isEmpty(data.cost))
        errors.cost = 'Cost is required';
    else if (!validator.isNumeric(data.cost))
        errors.cost = 'Cost must be a number';
    else if (parseInt(data.cost) < 0)
        errors.cost = 'Cost cannot be less than zero';

        
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateFacilityData;