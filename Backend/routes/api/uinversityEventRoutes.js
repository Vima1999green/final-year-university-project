const express = require("express");
const passport = require("passport");
const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../../controllers/universityEventController");

const router = express.Router();

//@route POST api/universityEvent/createEvent
//@desc Add event to database
//@access private
//@developer Malitha Chamikara

router.post(
  "/createEvent",
  passport.authenticate("jwt", { session: false }),
  createEvent
);

//@route POST api/universityEvent/getAllEvents
//@desc get all events from database
//@access private
//@developer Malitha Chamikara

router.get("/getAllEvents", getAllEvents);

//@route POST api/universityEvent/getEvent
//@desc get a single event from database
//@access private
//@developer Malitha Chamikara

router.get("/getEvent/:eventID", getEvent);

//@route PUT api/universityEvent/updateEvent
//@desc update a event in the database
//@access private
//@developer Malitha Chamikara

router.put(
  "/updateEvent/:eventID",
  passport.authenticate("jwt", { session: false }),
  updateEvent
);

//@route PUT api/universityEvent/deleteEvent
//@desc delete a event in the database
//@access private
//@developer Malitha Chamikara
router.delete(
  "/deleteEvent/:eventID",
  passport.authenticate("jwt", { session: false }),
  deleteEvent
);
module.exports = router;
