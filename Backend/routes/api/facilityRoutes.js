const express = require("express");
const passport = require("passport");
const {
  addFacility,
  getSingleFacilty,
  getAllfacilities,
  deleteSingleFacility,
  updateFacility,
  uploadPhotos
} = require("../../controllers/faciltyControllers");

const router = express.Router();

//@route POST api/facility/
//@desc Add facility to database
//@access private
//@developer Lahiru Srimal
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  addFacility
);


//@route POST api/facility/uploadPhotos
//@desc Upload facility images to the server
//@access private
//@developer Lahiru Srimal
router.post(
  "/uploadPhotos/:facilityId",
  passport.authenticate("jwt", { session: false }),
  uploadPhotos
);

//@route GET api/getFacility/:id
//@desc Get single facility
//@access public
//@developer Vimukthi Nuwan
router.get("/getFacility/:id", getSingleFacilty);

//@route GET api/getFacilities
//@desc Get single facilities
//@access public
//@developer Vimukthi Nuwan
router.get("/getAllFacilities", getAllfacilities);

//@route DELETE api/deleteSingleFacilities
//@desc delete single facilities
//@access private
//@developer Vimukthi Nuwan
router.delete(
  "/deleteSingleFacility/:id",
  passport.authenticate("jwt", { session: false }),
  deleteSingleFacility);

//@route POST api/updateFacility/:id
//@desc update single facility
//@access private
//@developer Primalsha Chamodi
router.put(
  "/updateFacility/:id",
  passport.authenticate("jwt", { session: false }),
  updateFacility
);

module.exports = router;