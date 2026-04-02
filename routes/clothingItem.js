const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItem");

//C.R.U.D

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update
router.put("/:itemId/likes", likeClothingItem);

//Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", dislikeClothingItem);

module.exports = router;
