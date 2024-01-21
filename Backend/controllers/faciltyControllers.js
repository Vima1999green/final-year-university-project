const Facility = require("../model/facilityModel");
const validateFacilityData = require("../validation/facitityRouteValidation/addFacility");
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
  await Facility.create(req.body)
    .then((newFacility) => {
      res.send(newFacility);
    })
    .catch((error) => {
      res.send(error);
    });
};

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

module.exports = {
  addFacility,
  getSingleFacilty,
  getAllfacilities,
  deleteSingleFacility,
  deleteAllFacilities,
};
