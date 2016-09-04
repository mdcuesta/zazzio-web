import Crypto from 'crypto';

export function generateSalt(len) {
  return Crypto.randomBytes(len).toString('base64');
}

export function sha512(password, salt) {
  const hash = Crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
}

