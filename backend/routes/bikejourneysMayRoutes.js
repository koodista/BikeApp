const express = require("express");
const bikejourneysMayControllers = require("../controllers/bikejourneysMayControllers");

const router = express.Router();

// @route - /api/bikejourneysmay/
router
  .route("/")
  .get(bikejourneysMayControllers.paginateBikejourneysMay)
  .post(bikejourneysMayControllers.createNewBikejourneysMay);

// @route - /api/bikejourneysmay/filter
router.route("/filter").get(bikejourneysMayControllers.filterBikejourneysMay);

// @route - /api/bikejourneysmay/sort
router.route("/sort").get(bikejourneysMayControllers.sortBikejourneysMay);

// @route - /api/bikejourneysmay/:id
router
  .route("/:id")
  .put(bikejourneysMayControllers.updateBikejourneysMayById)
  .delete(bikejourneysMayControllers.deleteBikejourneysMayById);

module.exports = router;
