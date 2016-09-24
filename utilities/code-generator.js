import UUID from 'uuid';

const LOWEST_NUM = 1000;
const HIGHEST_NUM = 9999;

export function generateConfirmationCode() {
  return UUID.v4();
}

export function generateMobileConfirmationcode() {
  const code = Math.floor((Math.random() * (HIGHEST_NUM - LOWEST_NUM)) + LOWEST_NUM);
  return code;
}
