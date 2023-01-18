const mongoose = require("mongoose");

const bikejourneysjulySchema = new mongoose.Schema(
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
  { collection: "202107" }
);

const BikejourneysJuly = mongoose.model(
  "BikejourneysJuly",
  bikejourneysjulySchema
);

module.exports = BikejourneysJuly;
