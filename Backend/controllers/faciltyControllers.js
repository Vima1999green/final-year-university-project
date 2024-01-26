const multer = require('multer');
const path = require('path');
const Facility = require("../model/facilityModel");
const validateFacilityData = require("../validation/facitityRouteValidation/addFacility");
const checkFileType=require('../validation/facitityRouteValidation/checkFileType')


//controller addFacilty()
//description add facility to database
//developer Lahiru Srimal
const addFacility = async (req, res) => {
  let data;
  // Check Content-Type header to determine the type of data
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      // JSON data
      data = req.body;
  } else {
      // Form data
      data = req.body.facilityData;
  }
  data=JSON.parse(data)

  if (req.user.userType !== "admin") {
    console.log(req.user.userType);
    console.log("user is not admin");
    return res.status(401).send("Unauthrized");
  }
  // Validate facility data
  const { errors, isValid } = await validateFacilityData(data);
  if (!isValid) {
    var errorMsg = "";
    Object.values(errors).forEach((error) => {
      errorMsg += error + "\r\n";
    });
    errorMsg = errorMsg.trim();
    return res.status(400).send(errorMsg);
  }
  //create facility in the database
  await Facility.create(data)
    .then((newFacility) => {
      res.send(newFacility);
    })
    .catch((error) => {
      res.send(error);
    });
};

//controller uploadPhotos()
//description upload photos to server
//developer Lahiru Srimal

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./uploads/"); // specify the destination folder
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // generate a unique filename
  },
});

// Create the Multer instance
const uploadImages = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
  }
})

// Middleware function to handle file uploads
const uploadPhotos = (req, res, next) => {
  // 'photos' should be the name attribute in your HTML form for the file input
  const uploadPhotoData = uploadImages.array('photos', 5);

  uploadPhotoData(req, res, (err) => {
      if (err instanceof multer.MulterError) {
          return res.status(400).send('Multer error: ' + err);
      } else if (err) {
          return res.status(500).send('Internal server error: ' + err);
      }

      // Files were successfully uploaded
      // console.log('Files uploaded:', req.files);
      next();
  });
}


//controller getSingleFacility()
//description get facility data in the database based on id
//developer Vimukthi Nuwan
const getSingleFacilty = (req, res) => {
  Facility.findById(req.params.id)
    .then((facility) => {
      res.send(facility);
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
      res.send(facilities);
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
    const deletedFacility = await facility.findbyIdAndDelete(faciltyId);

    if (!deletedFacility) {
      return res.status(404).send("Facility not Found");
    }
    res.send(deletedFacility);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server Error");
  }
};

const deleteAllFacilities = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      console.log(req.user.userType);
      console.log("user is not admin");
      return res.status(401).send("Unauthorized");
    }
    const deletionResult = await Facility.deleteMany({});

    if (deletionResult.deletedCount === 0) {
      return res.status(404).send("No facilities found to delete");
    }
    res.send(`Successfully deleted ${deletionResult.deletedCount} facilities`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//controller updateFacility()
//description update facility data in the database based on id
//developer primalsha chamodi

const updateFacility = async (req, res) => {
  try {
    if (req.user.userType !== 'admin') {
      console.log(req.user.userType)
      console.log('user is not admin')
      return res.status(401).send('Unauthrized')
    }

    const facilityId = req.params.id;
    const updatedData = req.body;

    //validation
    const { errors, isValid } = validate_UpdateFacilityData(updatedData);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Update the database
    const updatedFacility = await Facility.findByIdAndUpdate(
      facilityId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedFacility) {
      return res.status(404).send('Facility not found');
    }

    // Send the updated data to the frontend
    res.send(updatedFacility);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  addFacility,
  getSingleFacilty,
  getAllfacilities,
  deleteSingleFacility,
  deleteAllFacilities,
  updateFacility,
  uploadPhotos
};
