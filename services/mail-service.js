import * as Kickbox from 'kickbox';
import Promise from 'bluebird';
import Mailer from '../utilities/mailer';
import MailTemplates from './mail-templates-repository';

const BUYER_ACCOUNT_CONFIRMATION_SUBJECT = 'Complete your zazz.io account registration';
const mailer = new Mailer();
const getMailTemplate = MailTemplates;

export function emailExists(email) {
  const kickbox = Kickbox.client(process.env.KICKBOX_API_KEY
    || 'bb3ff5618fe84bef9da39c9d7092f7588330d80e327c1626c404e43c7941d58e').kickbox();

  return new Promise((resolve, reject) => {
    kickbox.verify(email, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

export function sendUserConfirmationMail(user, type) {
  const emailBody = getMailTemplate('account-confirmation-email', {
    firstName: user.profile.firstName,
    confirmationCode: user.confirmationCode,
  });
  if (type === 'buyer') {
    return new Promise((resolve, reject) => {
      mailer.send(user.email, null, BUYER_ACCOUNT_CONFIRMATION_SUBJECT,
        emailBody, (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        });
    });
  }

  return new Promise((resolve, reject) => {
    mailer.send(user.email, null, BUYER_ACCOUNT_CONFIRMATION_SUBJECT,
      emailBody, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
}
