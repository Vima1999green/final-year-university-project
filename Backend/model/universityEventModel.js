const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const universityEventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: [true, "Event name is required"],
    },
    eventDescription: {
      type: String,
      required: [true, "Event description is required"],
    },
    eventDates: {
      type: [Date],
      required: [true, "Events dates are required"],
    },
    facility: {
      type: String,
    },
    eventStatus: {
      type: String,
      required: [true, "Status is required"],
    },
    facilityId: {
      type: mongoose.ObjectId,
      required: [true, "Facility Id is required"],
    },
  },
  { timestamps: true }
);

const universityEventModel = mongoose.model(
  "universityEvent",
  universityEventSchema
);
module.exports = universityEventModel;
