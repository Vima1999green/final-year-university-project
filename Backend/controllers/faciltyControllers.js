const Facility = require('../model/facilityModel')
const validateFacilityData = require('../validation/facitityRouteValidation/addFacility')
//controller addFacilty()
//description add facility to database
//developer Lahiru Srimal
const addFacility = async (req, res) => {
    if (req.user.userType !== 'admin') {
        console.log(req.user.userType)
        console.log('user is not admin')
        return res.status(401).send('Unauthrized')
    }
    // Validate facility data
    const { errors, isValid } = await validateFacilityData(req.body);
    if (!isValid) {
        var errorMsg = ''
        Object.values(errors).forEach(error => {
            errorMsg += error + '\r\n'
        })
        errorMsg = errorMsg.trim()
        return res.status(400).send(errorMsg);
    }
    await Facility.create(req.body)
        .then(newFacility => {
            res.send(newFacility)
        })
        .catch(error => {
            res.send(error)
        })
}

//controller getSingleFacility()
//description get facility data in the database based on id
//developer Vimukthi Nuwan
const getSingleFacilty = (req, res) => {
    Facility.findById(req.params.id)
        .then(facility => {
            res.send(facility)
        })
        .catch(error => {
            res.status(404).send(error)
        })
}
module.exports = {
    addFacility,
    getSingleFacilty
}