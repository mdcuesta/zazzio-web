import Joi from 'joi';

export const AddMobileNumberValidation = {
  body: {
    countryCode: Joi.string().required(),
    number: Joi.string().required(),
  },
};

export const VerifyMobileNumberValidation = {
  body: {
    number: Joi.string().required(),
    verificationCode: Joi.string().required(),
  },
};
