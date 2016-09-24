import Promise from 'bluebird';
import Sms from '../utilities/sms';

const fromNumber = process.env.VIRTUAL_NUMBER || 'ZAZZIO';
const sms = new Sms();
const LOWEST_NUM = 1000;
const HIGHEST_NUM = 9999;

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

/*
export function sendUserConfirmationMobile(user) {
  return new Promise((resolve, reject) => {
    if (typeof user.mobileNumber === 'undefined'
      || typeof user.mobileNumber.number === 'undefined'
      || user.mobileNumber.number === null) {
      reject(new Error('Unable to send cofirmation to undefined mobile number.'));
    } else if (user.mobileNumber.isConfirmed) {
      reject(new Error('Unable to send confirmation to an already confirmed mobile number.'));
    } else {
      const code = Math.floor((Math.random() * (HIGHEST_NUM - LOWEST_NUM)) + LOWEST_NUM);
      user.setMobileNumberConfirmation(code);
      user.save()
      .then((doc) => {
        sms.send(fromNumber, doc.mobileNumber.number,
          `Your mobile number verification code is ${doc.mobileNumber.confirmationCode}.`,
          (error, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
      });
    }
  });
}
*/

