const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItem");

const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  next(NOT_FOUND_ERROR_CODE);
});

module.exports = router;
