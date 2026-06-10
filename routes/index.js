const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingItem");

const { createUser, login } = require("../controllers/users");

const { NOT_FOUND_ERROR_CODE } = require("../utils/errors");

const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

router.use("/signin", validateLogin, login);
router.use("/signup", validateCreateUser, createUser);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
