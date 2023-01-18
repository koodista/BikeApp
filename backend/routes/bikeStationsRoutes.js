const express = require("express");
const bikeStationsControllers = require("../controllers/bikeStationsControllers");

const router = express.Router();

// @route - /api/bikestations/
router
  .route("/")
  .get(bikeStationsControllers.paginateBikeStations)
  .post(bikeStationsControllers.createNewBikeStations);

// @route - /api/bikestations/filter
router.route("/filter").get(bikeStationsControllers.filterBikeStations);

// @route - /api/bikestations/filter
router.route("/sort").get(bikeStationsControllers.sortBikeStations);

// @route - /api/bikestations/:id
router
  .route("/:id")
  .put(bikeStationsControllers.updateBikeStationsById)
  .delete(bikeStationsControllers.DeleteBikeStationsById);

module.exports = router;
