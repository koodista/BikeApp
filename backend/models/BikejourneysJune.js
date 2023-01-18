const mongoose = require("mongoose");

const bikejourneysjuneSchema = new mongoose.Schema(
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
  { collection: "202106" }
);

const BikejourneysJune = mongoose.model(
  "BikejourneysJune",
  bikejourneysjuneSchema
);

module.exports = BikejourneysJune;
