const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { createUser, login } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db").catch((error) => {
  console.log(error);
});

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(PORT);
