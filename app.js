const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use((req, res, next) => {
  req.user = {
    _id: "69ca99a0f51664c19b930fbd",
  };
  next();
});

app.use(express.json());
app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`This thing on? Port: ${PORT}`);
});
