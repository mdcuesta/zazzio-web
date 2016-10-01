import Promise from 'bluebird';
import Sms from '../utilities/sms';

const fromNumber = process.env.VIRTUAL_NUMBER || 'ZAZZIO';

const sms = new Sms({
  apiKey: process.env.NEXMO_API_KEY || '2c4f50a5',
  apiSecret: process.env.NEXMO_API_SECRET || '0bb40e97656b7328',
  debug: process.env.NODE_ENV !== 'production',
});

export function send(toNumber, message) {
  return new Promise((resolve, reject) => {
    sms.send(fromNumber, toNumber, message, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export function sendVerificationCode(number) {
  return new Promise((resolve, reject) => {
    sms.sendVerificationCode(number, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export function verify(requestId, code) {
  return new Promise((resolve, reject) => {
    sms.verify(requestId, code, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
