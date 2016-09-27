import Validator from 'validator';

const validator = Validator;

function isEmpty(str) {
  return !validator.isLength(str, { min: 1 });
}

export default function validateProfile(req) {
  const form = req.body;

  const gender = form.gender || '';
  const profile = {
    firstName: form.firstName.trim(),
    middleName: form.middleName.trim(),
    lastName: form.lastName.trim(),
    gender,
    dateOfBirth: validator.toDate(`${form.bdayMonth}/${form.bdayDate}/${form.bdayYear}`),
    address: form.address.trim(),
    about: form.about.trim(),
  };

  const errors = [];
  if (isEmpty(profile.firstName.trim())) {
    errors.push('First Name');
  }

  if (isEmpty(profile.lastName)) {
    errors.push('Last Name');
  }

  return {
    profile,
    errors,
  };
}
