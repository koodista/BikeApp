const BikejourneysMay = require("../models/BikejourneysMay");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllBikejourneysMay = asyncHandler(async (req, res, next) => {
  const bikejourneys = await BikejourneysMay.find();

  res.status(200).json({
    success: true,
    data: bikejourneys,
  });
});

exports.createNewBikejourneysMay = asyncHandler(async (req, res, next) => {
  const bikejourneys = await BikejourneysMay.create(req.body);

  res.status(201).json({
    success: true,
    data: bikejourneys,
  });
});

exports.updateBikejourneysMayById = asyncHandler(async (req, res, next) => {
  let bikejourneys = await BikejourneysMay.findById(req.params.id);

  if (!bikejourneys) {
    return next(
      new ErrorResponse(
        `Bikejourney with id ${req.params.id} was not found`,
        404
      )
    );
  }

  bikejourneys = await BikejourneysMay.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    data: bikejourneys,
  });
});

exports.DeleteBikejourneysMayById = asyncHandler(async (req, res, next) => {
  let bikejourneys = await BikejourneysMay.findById(req.params.id);

  if (!bikejourneys) {
    return next(
      new ErrorResponse(
        `Bikejourney with id ${req.params.id} was not found`,
        404
      )
    );
  }

  await bikejourneys.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
