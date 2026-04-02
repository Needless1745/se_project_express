const User = require("../models/user");
const {
  OK_STATUS,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  FORBIDDEN_REQUEST_CODE,
  CREATED_SUCCESS,
} = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK_STATUS).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(FORBIDDEN_REQUEST_CODE).send({ message: err.message });
    });
};

//GET /byuserId

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = BAD_REQUEST_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
    });
};

// POST create user

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(CREATED_SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(FORBIDDEN_REQUEST_CODE).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
