// use this asyncHandler instead of try catch in all of the controllerfunctions

const asyncHandler = (controllerfunction) => (req, res, next) =>
  Promise.resolve(controllerfunction(req, res, next)).catch(next);

module.exports = asyncHandler;
