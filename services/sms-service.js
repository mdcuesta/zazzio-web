import Promise from 'bluebird';
import Sms from '../utilities/sms';

const fromNumber = process.env.VIRTUAL_NUMBER || 'ZAZZIO';
const sms = new Sms();

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

export function sendMobileConfirmation(toNumber, confirmationCode) {
  const message = `Your verification code is ${confirmationCode}.`;
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
