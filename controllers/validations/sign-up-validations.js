import Joi from 'joi';
import Validator from 'validator';

const validator = Validator;

function isEmpty(str) {
  return !validator.isLength(str, { min: 1 });
}

export const SignUpValidation = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    isSeller: Joi.bool().required(),
  },
};

export function validateSignUp(req) {
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

  if (isEmpty(data.email.value)) {
    data.email.error = 'Email.Required';
    data.hasError = true;
  } else if (!validator.isEmail(data.email.value)) {
    data.email.error = 'Email.Invalid';
    data.hasError = true;
  }

  if (isEmpty(data.password.value)) {
    data.password.error = 'Password.Required';
    data.hasError = true;
  } else if (!validator.isLength(data.password.value, { min: 8, max: 30 })) {
    data.password.error = 'Password.Invalid';
    data.hasError = true;
  }

  if (isEmpty(data.firstName.value)) {
    data.firstName.error = 'FirstName.Required';
    data.hasError = true;
  }

  if (isEmpty(data.lastName.value)) {
    data.lastName.error = 'LastName.Required';
    data.hasError = true;
  }
  return data;
}

export const BuyerSignUpValidation = {
};
