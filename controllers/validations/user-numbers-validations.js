import Joi from 'joi';

export const RequireMobileNumberValidation = {
  body: {
    number: Joi.string().required(),
  },
};

export const VerifyMobileNumberValidation = {
  body: {
    number: Joi.string().required(),
    verificationCode: Joi.string().required(),
  },
};
