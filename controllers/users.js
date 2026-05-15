const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");
const {
  OK_STATUS,
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CREATED_SUCCESS,
  SERVER_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../utils/errors");
const user = require("../models/user");

// GET byuserId

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((foundUser) => res.status(OK_STATUS).send(foundUser))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ meesage: "USer not found" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server." });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(BAD_REQUEST_ERROR_CODE)
      .send({ message: "Email and password are required" });
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(OK_STATUS).send({ token });
    })
    .catch((err) => {
      res
        .status(UNAUTHORIZED_ERROR_CODE)
        .send({ message: "Invalid email or password" });
    });
};

// POST create user

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!password) {
    res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid data" });
    return;
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(CREATED_SUCCESS).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: "A user with this email already exists." });
      }
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error occurred on the server" });
    });
};

//PATCH: Update Profile

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((updateUser) => res.status(OK_STATUS).send(updateUser))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occured on the server." });
    });
};

module.exports = { createUser, login, getCurrentUser, updateUser };
