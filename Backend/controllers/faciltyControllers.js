const multer = require('multer');
const path = require('path');
const Facility = require("../model/facilityModel");
const validateFacilityData = require("../validation/facitityRouteValidation/validateFacilityRegisterData");
const createMulterInstance = require('./createMulterInstance')
const checkFileType = require('../validation/facitityRouteValidation/checkPhotoType');
const isEmpty = require('../validation/isEmpty');
const validateFacilityUpdate = require('../validation/facitityRouteValidation/updateFacility')

//controller addFacilty()
//description add facility to database
//developer Lahiru Srimal
const addFacility = async (req, res) => {


  if (req.user.userType !== "admin") {
    console.log(req.user.userType);
    console.log("user is not admin");
    return res.status(401).send("Unauthrized");
  }
  // Validate facility data
  const { errors, isValid } = await validateFacilityData(req.body);
  if (!isValid) {
    var errorMsg = "";
    Object.values(errors).forEach((error) => {
      errorMsg += error + "\r\n";
    });
    errorMsg = errorMsg.trim();
    return res.status(400).send(errorMsg);
  }
  //create facility in the database
  await Facility.create(req.body)
    .then((newFacility) => {
      res.send(newFacility);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

//controller uploadPhotos()
//description upload photos to server
//developer Lahiru Srimal

const uploadPhotos = async (req, res, next) => {

  if (req.user.userType !== "admin") {
    console.log(req.user.userType);
    console.log("user is not admin");
    return res.status(401).send("Unauthorized");
  }
  //update images array in the database
  const facilityId = req.params.facilityId
  const uploadPhotosInstance = createMulterInstance(checkFileType, 'FacilityPhotos')
  if (!isEmpty(uploadPhotosInstance.array('photos', 6))) {
    const uploadPhotoData = uploadPhotosInstance.array('photos', 6);
    uploadPhotoData(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send('Multer error: ' + err);
      } else if (err) {
        return res.status(500).send('Internal server error: ' + err);
      }
      const imageArray = req.files.map(file => file.filename)
      const facility = Facility.findOneAndUpdate(
        { _id: facilityId },
        { images: imageArray },
        { new: true }
      ).then(res => {
        console.log('Database updated')
      }).catch(error => {
        return res.status(500).send('Error updating facility: ', error.response.data);
      })
      // Files were successfully uploaded
      console.log('Files uploaded');
      res.status(200).send('Files uploaded');
      // next();
    });
  } else {
    res.status(200).send('No files to upload');
  }
}


//controller getSingleFacility()
//description get facility data in the database based on id
//developer Vimukthi Nuwan
const getSingleFacilty = (req, res) => {
  Facility.findById(req.params.id)
    .then((facility) => {

      const baseUrl = 'http://localhost:4000/uploads/FacilityPhotos/';

      const imagesWithUrls = facility.images.map((image) => baseUrl + image);
      // console.log({ ...facility._doc, images: imagesWithUrls })
      const result = { ...facility._doc, images: imagesWithUrls };
      res.send(result)

    })

    .catch((error) => {
      res.status(404).send(error);
    });
};

//controller getAllfacilities()
//description get all facilities in the database based on id
//developer Vimukthi Nuwan
const getAllfacilities = (req, res) => {
  Facility.find()
    .then((facilities) => {
      // console.log(facilities)
      const baseUrl = 'http://localhost:4000/uploads/FacilityPhotos/';
      const facilitiesWithUrls = facilities.map((facility) => {
        const imagesWithUrls = facility.images.map((image) => baseUrl + image);
        // console.log({ ...facility._doc, images: imagesWithUrls })
        return { ...facility._doc, images: imagesWithUrls };
      });

      // console.log(facilitiesWithUrls);
      res.send(facilitiesWithUrls);
      // res.send(facilities);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

//controller deleteSingleFacility()
//description delete facility data in the database based on id
//developer Vimukthi Nuwan
const deleteSingleFacility = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      console.log(req.user.userType);
      console.log("user is not admin");
      return res.status(401).send("Unauthrized");
    }

    const faciltyId = req.params.id;
    const deletedFacility = await Facility.findByIdAndDelete(faciltyId);

    if (!deletedFacility) {
      return res.status(404).send("Facility not Found");
    } else
      return res.send('Facility deleted sucessfully');
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server Error");
  }
};

//controller updateFacility()
//description update facility data in the database based on id
//developer primalsha chamodi

const updateFacility = async (req, res) => {
  if (req.user.userType === 'admin') {
    let faciltyData = req.body
    faciltyData.id = req.params.id
    const { errors, isValid } = await validateFacilityUpdate(faciltyData);
    if (!isValid) {
      var errorMsg = ''
      Object.values(errors).forEach(error => {
        errorMsg += error + '\r\n'
      })
      errorMsg = errorMsg.trim()
      res.status(400).send(errorMsg);
    }
    else {
      try {
        const facility = await Facility.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (facility) {
          console.log('Facility updated')
          return res.send(facility)
        }
      } catch (error) {
        console.error("Error updating or finding facility:", error);
        return res.status(500).send("Error updating or finding facility");
      }
    }
  } else {
    return res.status(401).send('You are not authorized to update facility data')
  }
};

module.exports = {
  addFacility,
  getSingleFacilty,
  getAllfacilities,
  deleteSingleFacility,
  updateFacility,
  uploadPhotos
};