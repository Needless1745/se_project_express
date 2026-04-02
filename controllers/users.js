const User = require("../models/user");
const {
  OK_STATUS,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CREATED_SUCCESS,
  SERVER_ERROR_CODE,
} = require("../utils/errors");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK_STATUS).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

// GET byuserId

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((user) => res.status(OK_STATUS).send(user))
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
          .send({ message: "Invalid data passed" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = { getUsers, createUser, getUser };
