const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeclothingItem,
  dislikeclothingItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

// C.R.U.D

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", auth, likeclothingItem);

// Delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeclothingItem);

module.exports = router;
