const router = require("express").Router();

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
router.post("/", auth, validateCreateItem, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", auth, validateId, likeclothingItem);

// Delete
router.delete("/:itemId", auth, validateId, deleteItem);
router.delete("/:itemId/likes", auth, validateId, dislikeclothingItem);

module.exports = router;
