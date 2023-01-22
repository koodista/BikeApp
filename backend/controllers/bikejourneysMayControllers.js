const BikejourneysMay = require("../models/BikejourneysMay");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.paginateBikejourneysMay = asyncHandler(async (req, res, next) => {
  let query = BikejourneysMay.find();

  if (req.query.filter) {
    //if filter query parameter is present
    let filter = JSON.parse(req.query.filter);
    query = query.find(filter); //filter the entire collection
    const result = await query;
    res.status(200).json({
      status: "success",
      data: result,
    });
  } else {
    //if filter query parameter is not present
    //Parsing the query parameters for sorting
    if (req.query.sort) {
      let sortBy = JSON.parse(req.query.sort);
      query = query.sort(sortBy);
    }

    const pageSize = parseInt(req.query.limit) || 30; //page size
    const page = parseInt(req.query.page) || 1; //default page number
    const skip = (page - 1) * pageSize; //number of documents to skip
    const totalPages = await BikejourneysMay.countDocuments(); //total number of documents

    const pages = Math.ceil(totalPages / pageSize); //total number of pages
    query = query.skip(skip).limit(pageSize).allowDiskUse(true);
    const result = await query;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      pageSize,
      data: result,
    });
  }
});

exports.filterBikejourneysMay = asyncHandler(async (req, res, next) => {
  let query = BikejourneysMay.find();

  // Loop over each query parameter
  Object.keys(req.query).forEach((param) => {
    // create query based on parameter and its value
    query = query.where(param).equals(req.query[param]);
  });

  const pageSize = parseInt(req.query.limit) || 30; // page size
  const page = parseInt(req.query.page) || 1; // default page number
  const skip = (page - 1) * pageSize; // number of documents to skip
  const totalPages = await BikejourneysMay.countDocuments(); //total number of documents

  const pages = Math.ceil(totalPages / pageSize); //total number of pages

  query = query
    .limit(pageSize)
    .skip(skip)
    .allowDiskUse(true)
    .sort({ [req.query.sort]: req.query.dir }); //query for pagination and sorting

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
    pageSize,
    data: result,
  });
});

exports.sortBikejourneysMay = asyncHandler(async (req, res, next) => {
  let query = BikejourneysMay.find();

  const pageSize = parseInt(req.query.limit) || 30; // page size
  const page = parseInt(req.query.page) || 1; // default page number
  const skip = (page - 1) * pageSize; //number of documents to skip

  let sortField = req.query.sort; // Set sort field

  query = query.limit(pageSize).skip(skip).sort(sortField).allowDiskUse(true);

  const result = await query;

  res.status(200).json({
    status: "success",
    count: result.length,
    page,
    pageSize,
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
