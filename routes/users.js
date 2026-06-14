const router = require("express").Router();
const auth = require("../middlewares/auth");

const { getCurrentUser, updateUser } = require("../controllers/users");

// Read
router.get("/me", auth, getCurrentUser);

// Create
router.patch("/me", auth, updateUser);

module.exports = router;
