const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");
const ForbiddenError = require("../utils/ForbiddenError");
const UnauthorizedError = require("../utils/UnauthorizedError");
const ConflictError = require("../utils/ConflictError");

const User = require("../models/user");
const {
  OK_STATUS,
  CREATED_SUCCESS,
  SERVER_ERROR_CODE,
} = require("../utils/errors");

const user = require("../models/user");

// GET byuserId

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((foundUser) => res.status(OK_STATUS).send(foundUser))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found."));
      }
      return next(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return user
    .findUserByCredentials(email, password)
    .then((foundUser) => {
      const token = jwt.sign({ _id: foundUser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(OK_STATUS).send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Incorrect email or password."));
      }

      return next(err);
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
    .then((createdUser) => {
      const userObj = createdUser.toObject();
      delete userObj.password;
      res.status(CREATED_SUCCESS).send(userObj);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return next(
          new ConflictError("A user with this email exists already.")
        );
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      return next(err);
    });
};

// PATCH: Update Profile

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    )
    .orFail()
    .then((updatedUser) => res.status(OK_STATUS).send(updatedUser))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not Found"));
      }
      return next(err);
    });
};

module.exports = { createUser, login, getCurrentUser, updateUser };
