const mongoose = require("mongoose");
const validator = require("validator");
const isEmpty = require("../isEmpty");
const UniversityEvent = require("../../model/universityEventModel");

const validateUpdateEventData = async (data) => {
  let errors = {};

  data.eventName = isEmpty(data.eventName) ? "" : data.eventName;
  data.eventDescription = isEmpty(data.eventDescription)
    ? ""
    : data.eventDescription;
  data.facility = isEmpty(data.facility) ? "" : data.facility;
  data.eventStatus = isEmpty(data.eventStatus) ? "" : data.eventStatus;
  data.eventDates = isEmpty(data.eventDates) ? "" : data.eventDates;

  //validating Event name
  if (validator.isEmpty(data.eventName))
    errors.eventName = "Event name is required";
  else {
    const existingEvent = await UniversityEvent.find({
      $and: [
        {
          eventName: data.eventName,
        },
        {
          _id: { $ne: data.eventID },
        },
      ],
    });
    if (!isEmpty(existingEvent)) {
      errors.eventName = "Event is already exists";
    }
  }

  //validate eventDescription
  if (validator.isEmpty(data.eventDescription))
    errors.eventDescription = "Event description is required";

  //validate EventDates
  if (!Array.isArray(data.eventDates) || data.eventDates.length === 0) {
    errors.eventDates =
      "Event Dates is required and must be an array with at least one date";
  }

  //validate status
  const validStatusValues = [
    "notstarted",
    "started",
    "ongoing",
    "finished",
    "postponed",
  ];
  if (validator.isEmpty(data.eventStatus))
    errors.eventStatus = "Event Status is required";
  else if (!validator.isIn(data.eventStatus, validStatusValues)) {
    errors.eventStatus = "Invalid Event status";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateUpdateEventData;
