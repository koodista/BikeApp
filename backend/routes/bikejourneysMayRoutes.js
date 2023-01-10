const express = require("express");
const bikejourneysMayControllers = require("../controllers/bikejourneysMayControllers");

const router = express.Router();

// @route - /api/bikejourneysmay/
router
  .route("/")
  .get(bikejourneysMayControllers.getAllBikejourneysMay)
  .post(bikejourneysMayControllers.createNewBikejourneysMay);

// @route - /api/bikejourneysmay/:id
router
  .route("/:id")
  .put(bikejourneysMayControllers.updateBikejourneysMayById)
  .delete(bikejourneysMayControllers.DeleteBikejourneysMayById);

module.exports = router;
