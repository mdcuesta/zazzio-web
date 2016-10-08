import UUID from 'uuid';

export function generateConfirmationCode() {
  return UUID.v4();
}

export function generateFileName() {
  return UUID.v1().replace(/-/g, '');
}

export function generateId() {
  return UUID.v1().replace(/-/g, '');
}
