const mongoose = require("mongoose");

const bikestationsSchema = new mongoose.Schema(
  {
    FID: {
      type: Number,
    },
    ID: {
      type: Number,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    capacity: {
      type: Number,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  { collection: "bikestations" }
);

const Bikestations = mongoose.model("Bikestations", bikestationsSchema);

module.exports = Bikestations;
