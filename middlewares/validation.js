const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The min length of the "name" field is 2',
      "string.max": 'The max length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
  }),
});

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The min length of the "name" field is 2',
      "string.max": 'The max length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" fiel msut be filled in',
      "string.email": "The email must be a valid email",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": "The itemId must be a hexadecimal value",
      "string.length": "The itemId must be 24 characters long",
    }),
  }),
});
const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.hex": "The itemId must be a hexadecimal value",
      "string.length": "The itemId must be 24 characters long",
    }),
  }),
});

module.exports = {
  validateCreateItem,
  validateUserCreate,
  validateUserLogin,
  validateId,
  validateUserId,
};
