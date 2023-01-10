const mongoose = require("mongoose");

const bikejourneysmaySchema = new mongoose.Schema(
  {
    departure: {
      type: Date,
    },
    return: {
      type: Date,
    },
    departureStationId: {
      type: Number,
    },
    departureStationName: {
      type: String,
    },
    returnStationId: {
      type: Number,
    },
    returnStationName: {
      type: String,
    },
    distance: {
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
  { collection: "202105" }
);

const BikejourneysMay = mongoose.model(
  "BikejourneysMay",
  bikejourneysmaySchema
);

module.exports = BikejourneysMay;
