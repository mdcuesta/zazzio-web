import Promise from 'bluebird';
import Sms from '../utilities/sms';

const fromNumber = process.env.VIRTUAL_NUMBER || 'ZAZZIO';

const sms = new Sms({
  apiKey: process.env.NEXMO_API_KEY || '045274a3',
  apiSecret: process.env.NEXMO_API_SECRET || '51438041f498dcb4',
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
