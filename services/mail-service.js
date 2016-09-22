import * as Kickbox from 'kickbox';
import Promise from 'bluebird';
import Mailer from '../utilities/mailer';

const BUYER_ACCOUNT_CONFIRMATION_SUBJECT = 'Complete your Zazz.io Account Registration';
const mailer = new Mailer();

function getBuyerAccountConfirmationEmailBody(account) {
  return `
    Hi ${account.firstName},
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aenean vel diam in ante elementum rhoncus sit amet at nisi. 
    Quisque vel tellus sagittis diam consequat consequat in sit amet augue. 
    Aliquam interdum mattis tincidunt. Duis rutrum odio ullamcorper, 
    euismod dolor sit amet, imperdiet arcu. 
    Ut at orci at metus faucibus eleifend sit amet ac augue. 
    Duis non erat consectetur, auctor libero ut, efficitur eros. 
    tiam risus metus, convallis id justo non, venenatis gravida sapien. 
    Nullam blandit quam efficitur mauris congue, 
    vel interdum nisi fringilla. Duis venenatis odio nec mi efficitur scelerisque. 
    In semper arcu eu lacinia sollicitudin. Sed imperdiet vel metus vel fermentum.
  `;
}

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
  if (type === 'buyer') {
    return new Promise((resolve, reject) => {
      mailer.send(user.email, null, BUYER_ACCOUNT_CONFIRMATION_SUBJECT,
        getBuyerAccountConfirmationEmailBody(user), (error, response) => {
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
      getBuyerAccountConfirmationEmailBody(user), (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
  });
}
