const router = require("express").Router();
const auth = require("../middlewares/auth");
const limiter = require("../middlewares/limiter");

const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserCreate } = require("../middlewares/validation");

// Read
router.get("/me", auth, limiter, getCurrentUser);

// Create
router.patch("/me", auth, limiter, validateUserCreate, updateUser);

module.exports = router;
