const UniversityEvent = require("../model/universityEventModel");
const isEmpty = require("../validation/isEmpty");

//controller createEvent()
//description add event to database
//developer Malitha Chamikara

const createEvent = async (req, res) => {
  //create Event in the database
  if (req.user.userType === "director") {
    await UniversityEvent.create(req.body)
      .then((newEvent) => {
        res.send(newEvent);
      })

      .catch((error) => {
        res.status(400).send(error);
      });
  } else {
    return res.status(401).send("You are not authorized to create event");
  }
};

//controller getAllEvents()
//description get all events from database
//developer Malitha Chamikara
const getAllEvents = async (req, res) => {
  await UniversityEvent.find()
    .then((universityEvents) => {
      res.send(universityEvents);
    })

    .catch((error) => {
      res.status(400).send(error);
    });
};

//controller getBooking()
//description get a  event according to eventID
//developer Malitha Chamikara
const getEvent = async (req, res) => {
  const eventID = req.params.eventID;
  console.log(req.params.eventID);
  await UniversityEvent.findById(eventID)
    .then((uniEvent) => {
      if (!uniEvent) {
        return res.status(404).send("Event cannot found");
      }
      console.log(uniEvent);
      res.send(uniEvent);
    })
    .catch((err) => {
      // console.log(err)
      res.status(400).send("Can not get any events");
    });
};
//controller updateEvent()
//description update a event in the database
//developer Malitha Chamikara
const updateEvent = async (req, res) => {
  if (req.user.userType === "director") {
    let eventData = req.body;

    try {
      const uniEvent = await UniversityEvent.findOneAndUpdate(
        { _id: req.params.eventID },
        eventData,
        { new: true }
      );
      if (uniEvent) {
        console.log("Event updated");
        return res.send(uniEvent);
      }
    } catch (error) {
      console.error("Error updating an event", error);
      return res.status(500).send("Error  updating an event");
    }
  } else {
    return res.status(401).send("You are not authorized to update this event");
  }
};
//controller deleteEvent()
//description delete event data in the database based on eventID
//developerMalitha Chamikara

const deleteEvent = async (req, res) => {
  if (req.user.userType === "director") {
    try {
      const eventID = req.params.eventID;
      const deletedUniEvent = await UniversityEvent.findByIdAndDelete(eventID);
      if (!deletedUniEvent) {
        return res.status(404).send("Event not found");
      } else {
        return res.status(200).send("Event deleted succesfully");
      }
    } catch (error) {
      console.error("Error deleting event", error);
      return res.status(500).send("Error deleting event");
    }
  } else {
    return res.status(401).send("You are not authorized to delete this event");
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
