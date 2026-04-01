class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = BadRequestError;
    this.name = "BadRequestError";
  }
}

module.exports = BadRequestError;
