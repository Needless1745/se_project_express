const clothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");
const ForbiddenError = require("../utils/ForbiddenError");

const { OK_STATUS, CREATED_SUCCESS } = require("../utils/errors");

// GET Return all clothingItems

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((items) => res.status(OK_STATUS).send(items))
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

// POST Create new clothingItem

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.status(CREATED_SUCCESS).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

// DELETE Remove item by id

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(new ForbiddenError("Forbidden"));
      }
      return clothingItem
        .findByIdAndDelete(itemId)
        .then((deletedItem) => res.status(OK_STATUS).send({ deletedItem }));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not Found"));
      }
      return next(err);
    });
};

// PUT Like a clothing item

const likeclothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  clothingItem
    .findByIdAndUpdate(itemId, { $addToSet: { likes: userId } }, { new: true })
    .orFail()
    .then((item) => res.status(OK_STATUS).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

// DELETE Removes like from clothing Item

const dislikeclothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  clothingItem
    .findByIdAndUpdate(itemId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((item) => res.status(OK_STATUS).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeclothingItem,
  dislikeclothingItem,
};
