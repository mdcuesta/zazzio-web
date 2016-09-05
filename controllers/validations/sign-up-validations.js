import Joi from 'joi';

export const BuyerQuickSignUpValidation = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  },
};

export const BuyerSignUpValidation = {
};

