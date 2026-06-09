const { SERVER_ERROR_CODE } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || SERVER_ERROR_CODE;
  const message = err.errorMessage || "An error occured on the server.";

  res.status(statusCode).send({ message });
};

module.exports = errorHandler;
