const BadRequestError = require("./BadRequestError");
const UnauthorizedError = require("./UnauthorizedError");
const ForbiddenError = require("./ForbiddenError");
const NotFoundError = require("./NotFoundError");
const ConflictError = require("./ConflictError");

const NOT_FOUND_ERROR_CODE = NotFoundError;

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  NOT_FOUND_ERROR_CODE,
};
