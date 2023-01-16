const express = require("express");
const bikejourneysMayControllers = require("../controllers/bikejourneysMayControllers");

const router = express.Router();

// @route - /api/bikejourneysmay/
router
  .route("/may")
  .get(bikejourneysMayControllers.paginateBikejourneysMay)
  .post(bikejourneysMayControllers.createNewBikejourneysMay);

// @route - /api/bikejourneysmay/filter
router
  .route("/may/filter")
  .get(bikejourneysMayControllers.filterBikejourneysMay);

// @route - /api/bikejourneysmay/filter
router.route("/may/sort").get(bikejourneysMayControllers.sortBikejourneysMay);

// @route - /api/bikejourneysmay/:id
router
  .route("/may/:id")
  .put(bikejourneysMayControllers.updateBikejourneysMayById)
  .delete(bikejourneysMayControllers.DeleteBikejourneysMayById);

module.exports = router;
