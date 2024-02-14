const express = require("express");
const passport = require("passport");
const {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  uploadNIC,
  uploadLetter,
  getBooking
} = require("../../controllers/bookingController");

const router = express.Router();

//@route POST api/booking/
//@desc Add booking to database
//@access private
//@developer Lahiru Srimal
router.post('/createBooking', createBooking);


//@route GET api/booking/
//@desc Get all bookings from database
//@access private
//@developer Malitha Chamikara

router.get('/getAllBookings', getAllBookings);

//@route PUT api/booking/
//@desc update a booking in the database
//@access private
//@developer Malitha Chamikara
router.put('/updateBooking/:bookingID',
  passport.authenticate("jwt", { session: false }),
  updateBooking)

//@route DELETE api/booking/
//@desc delete a booking from the database
//@access private
//@developer Malitha Chamikara

router.delete('/deleteBooking/:bookingId',
  passport.authenticate("jwt", { session: false }),
  deleteBooking)

//@route POST api/booking/
//@desc upload NIC to the database
//@access private
//@developer Malitha Chamikara
router.post('/uploadNIC/:bookingID',
  passport.authenticate("jwt", { session: false }),
  uploadNIC
)

//@route POST api/booking/uploadLetter/:bookingID
//@desc upload permission letter to the database
//@access private
//@developer Lahiru Srimal
router.post('/uploadLetter/:bookingID',
  passport.authenticate("jwt", { session: false }),
  uploadLetter
)

//@route POST api/booking/getBooking/:userID
//@desc get all bookings according to userId
//@access public
//@developer Lahiru Srimal
router.post('/getBooking/:userID',
  getBooking
)

module.exports = router;
