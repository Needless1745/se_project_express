const User = require("../models/user");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(ForbiddenError).send({ message: err.message });
    });
};

//GET /byuserId

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NotFoundError;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NotFoundError).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BadRequestError).send({ message: err.message });
      }
      return res.status(ForbiddenError).send({ message: err.message });
    });
};

// POST create user

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BadRequestError).send({ message: err.message });
      }
      return res.status(ForbiddenError).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
