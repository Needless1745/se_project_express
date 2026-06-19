const { errors } = require("celebrate");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
require("dotenv").config();

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((error) => {
  console.error(error);
});

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
