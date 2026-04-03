const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

// Read
router.get("/", getUsers);
router.get("/:userId", getUser);

// Create
router.post("/", createUser);

module.exports = router;
