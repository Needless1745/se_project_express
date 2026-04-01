const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require("../utils/errors");

//GET- Return all ClothingItems

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(ForbiddenError).send({ message: "Error from getItems", e });
    });
};

//POST- Create new ClothingItem

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  console.log(req.user._id);

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      if (e.name === "DocumentNotFoundError") {
        return res.status(NotFoundError).send({ message: e.message });
      } else if (e.name === "ValidationError") {
        return res.status(BadRequestError).send({ message: e.message });
      }
      return res.status(ForbiddenError).send({ message: e.message });
    });
};

//DELETE Remove item by id

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      res.status(ForbiddenError).send({ message: "Error from deleteItem", e });
    });
};

module.exports = { createItem, getItems, deleteItem };
