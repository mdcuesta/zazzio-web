import Joi from 'joi';
import Validator from 'validator';

const validator = Validator;

export const SignUpValidation = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    isSeller: Joi.bool().required(),
  },
};

export function ValidateSignUp(req) {
  const data = {
    email: {
      value: req.body.email.trim(),
      error: '',
      existed: false,
    },
    password: {
      value: req.body.password.trim(),
      error: '',
    },
    firstName: {
      value: req.body.firstName.trim(),
      error: '',
    },
    lastName: {
      value: req.body.lastName.trim(),
      error: '',
    },
    isSeller: {
      value: req.body.isSeller,
    },
    hasError: false,
  };

  if (!validator.isLength(data.email.value, { min: 1 })) {
    data.email.error = 'Email address required';
    data.hasError = true;
  } else if (!validator.isEmail(data.email.value)) {
    data.email.error = 'Invalid email address';
    data.hasError = true;
  }

  if (!validator.isLength(data.password.value, { min: 1 })) {
    data.password.error = 'Password required';
    data.hasError = true;
  } else if (!validator.isLength(data.password.value, { min: 8, max: 30 })) {
    data.password.error = 'Invalid password';
    data.hasError = true;
  }

  if (!validator.isLength(data.firstName.value, { min: 1 })) {
    data.firstName.error = 'First name required';
    data.hasError = true;
  }

  if (!validator.isLength(data.lastName.value, { min: 1 })) {
    data.lastName.error = 'Last name required';
    data.hasError = true;
  }
  return data;
}

export const BuyerSignUpValidation = {
};
