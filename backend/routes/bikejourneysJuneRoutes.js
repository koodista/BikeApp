const express = require("express");
const bikejourneysJuneControllers = require("../controllers/bikejourneysJuneControllers");

const router = express.Router();

// @route - /api/bikejourneysjune/
router
  .route("/")
  .get(bikejourneysJuneControllers.paginateBikejourneysJune)
  .post(bikejourneysJuneControllers.createNewBikejourneysJune);

// @route - /api/bikejourneysjune/filter
router.route("/filter").get(bikejourneysJuneControllers.filterBikejourneysJune);

// @route - /api/bikejourneysjune/sort
router.route("/sort").get(bikejourneysJuneControllers.sortBikejourneysJune);

// @route - /api/bikejourneysjune/:id
router
  .route("/:id")
  .put(bikejourneysJuneControllers.updateBikejourneysJuneById)
  .delete(bikejourneysJuneControllers.DeleteBikejourneysJuneById);

module.exports = router;
