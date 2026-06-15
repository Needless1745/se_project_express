const { errors } = require("celebrate");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
require("dotenv").config();

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((error) => {
  console.error(error);
});

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.use("/", routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
