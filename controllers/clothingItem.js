const ClothingItem = require("../models/clothingItem");
const {
  OK_STATUS,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
  FORBIDDEN_REQUEST_CODE,
} = require("../utils/errors");

// GETReturn all ClothingItems

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS).send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(BAD_REQUEST_ERROR_CODE)
        .send({ message: "Error from getItems", err });
    });
};

// POST Create new ClothingItem

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data passed" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

// DELETE Remove item by id

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        res.status(FORBIDDEN_REQUEST_CODE).send({ message: "Forbidden" });
      }
      return item
        .deleteOne()
        .then(() =>
          res.status(OK_STATUS).send({ message: "Item deleted successfully!" })
        );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid user ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "User not found" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

// PUT Like a clothing item

const likeClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid user ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "User not found" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

// Delete Removes like from clothing Item

const dislikeClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid user ID" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "User not found" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeClothingItem,
  dislikeClothingItem,
};
