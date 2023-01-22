const express = require("express");
const bikejourneysJulyControllers = require("../controllers/bikejourneysJulyControllers");

const router = express.Router();

// @route - /api/bikejourneysjuly/
router
  .route("/")
  .get(bikejourneysJulyControllers.paginateBikejourneysJuly)
  .post(bikejourneysJulyControllers.createNewBikejourneysJuly);

// @route - /api/bikejourneysjuly/filter
router.route("/filter").get(bikejourneysJulyControllers.filterBikejourneysJuly);

// @route - /api/bikejourneysjuly/sort
router.route("/sort").get(bikejourneysJulyControllers.sortBikejourneysJuly);

// @route - /api/bikejourneysjuly/:id
router
  .route("/:id")
  .put(bikejourneysJulyControllers.updateBikejourneysJulyById)
  .delete(bikejourneysJulyControllers.DeleteBikejourneysJulyById);

module.exports = router;
