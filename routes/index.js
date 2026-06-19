const router = require("express").Router();
const limiter = require("../middlewares/limiter");

const userRouter = require("./users");
const itemRouter = require("./clothingItem");

const { createUser, login } = require("../controllers/users");

const {
  validateUserCreate,
  validateUserLogin,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/NotFoundError");

router.use("/signin", limiter, validateUserLogin, login);
router.use("/signup", limiter, validateUserCreate, createUser);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
