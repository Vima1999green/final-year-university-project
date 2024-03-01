const mongoose = require("mongoose");
const validator = require("validator");
const isEmpty = require("../isEmpty");

const validateEventData = (data) => {
  let errors = {};

  //replace empty,undifined,null objects with string

  data.eventName = isEmpty(data.eventName) ? "" : data.eventName;
  data.eventDescription = isEmpty(data.eventDescription)
    ? ""
    : data.eventDescription;
  data.facility = isEmpty(data.facility) ? "" : data.facility;
  data.eventDates = isEmpty(data.eventDates) ? "" : data.eventDates;
  data.eventStatus = isEmpty(data.eventStatus) ? "" : data.eventStatus;

  //validate eventName
  if (validator.isEmpty(data.eventName))
    errors.eventName = "Event  name is required";

  //validate eventDescription
  if (validator.isEmpty(data.eventDescription))
    errors.eventDescription = "Event description is required";

  // validate EventDates
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

module.exports = validateEventData;
