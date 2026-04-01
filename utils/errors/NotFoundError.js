class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.statusCode = NotFoundError;
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;
