const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

// C.R.U.D

// Create
router.post("/", auth, createItem);

// Read
router.get("/", getItems);

// Update
router.put("/:itemId/likes", auth, likeClothingItem);

// Delete
router.delete("/:itemId", auth, deleteItem);
router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
