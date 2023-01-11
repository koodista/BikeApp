const BikejourneysMay = require("../models/BikejourneysMay");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllBikejourneysMay = asyncHandler(async (req, res, next) => {
  let query = BikejourneysMay.find();
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 30;
  const skip = (page - 1) * pageSize;
  const totalRows = await BikejourneysMay.countDocuments();

  const pages = Math.ceil(totalRows / pageSize);

  query = query.skip(skip).limit(pageSize);

  if (page > pages) {
    return res.status(404).json({
      status: "failed",
      message: "No page found",
    });
  }

  const result = await query;

  res.status(200).json({
    status: "success",
    count: result.length,
    page,
    pages,
    data: result,
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
