const BikejourneysJune = require("../models/BikejourneysJune");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

exports.paginateBikejourneysJune = asyncHandler(async (req, res, next) => {
  let query = BikejourneysJune.find();

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
    const totalPages = await BikejourneysJune.countDocuments(); //total number of documents

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

exports.filterBikejourneysJune = asyncHandler(async (req, res, next) => {
  let query = BikejourneysJune.find();

  Object.keys(req.query).forEach((param) => {
    query = query.where(param).equals(req.query[param]);
  });

  const pageSize = parseInt(req.query.limit) || 30;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * pageSize;
  const totalPages = await BikejourneysJune.countDocuments();

  const pages = Math.ceil(totalPages / pageSize);

  query = query
    .limit(pageSize)
    .skip(skip)
    .allowDiskUse(true)
    .sort({ [req.query.sort]: req.query.dir });

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

exports.sortBikejourneysJune = asyncHandler(async (req, res, next) => {
  let query = BikejourneysJune.find();

  const pageSize = parseInt(req.query.limit) || 30;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * pageSize;

  let sortField = req.query.sort;

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

exports.createNewBikejourneysJune = asyncHandler(async (req, res, next) => {
  const bikejourneys = await BikejourneysJune.create(req.body);

  res.status(201).json({
    success: true,
    data: bikejourneys,
  });
});

exports.updateBikejourneysJuneById = asyncHandler(async (req, res, next) => {
  let bikejourneys = await BikejourneysJune.findById(req.params.id);

  if (!bikejourneys) {
    return next(
      new ErrorResponse(
        `Bikejourney with id ${req.params.id} was not found`,
        404
      )
    );
  }

  bikejourneys = await BikejourneysJune.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(201).json({
    success: true,
    data: bikejourneys,
  });
});

exports.DeleteBikejourneysJuneById = asyncHandler(async (req, res, next) => {
  let bikejourneys = await BikejourneysJune.findById(req.params.id);

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
