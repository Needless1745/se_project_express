const router = require("express").Router();
const limiter = require("../middlewares/limiter");

const {
  createItem,
  getItems,
  deleteItem,
  likeclothingItem,
  dislikeclothingItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

const { validateCreateItem, validateId } = require("../middlewares/validation");
// C.R.U.D

// Create
router.post("/", auth, limiter, validateCreateItem, createItem);

// Read
router.get("/", limiter, getItems);

// Update
router.put("/:itemId/likes", auth, limiter, validateId, likeclothingItem);

// Delete
router.delete("/:itemId", auth, limiter, validateId, deleteItem);
router.delete("/:itemId/likes", auth, limiter, validateId, dislikeclothingItem);

module.exports = router;
