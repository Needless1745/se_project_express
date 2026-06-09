const { FORBIDDEN_REQUEST_CODE } = require("./errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_REQUEST_CODE;
  }
}

module.exports = ForbiddenError;
