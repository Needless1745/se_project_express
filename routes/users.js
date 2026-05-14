const router = require("express").Router();
const { getCurrentUser } = require("../controllers/users");

const { getUsers, createUser, getUser } = require("../controllers/users");

// Read
router.get("/me", getUser);

// Create
router.post("/", createUser);

module.exports = router;
