const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  statusCode: 429,
  message: "Too many request, please try again later.",
});

module.exports = limiter;
