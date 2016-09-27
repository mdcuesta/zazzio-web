import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ConfirmationEmail from '../mail-templates/confirmation-email';

function getEmailBody(template) {
  let markup = '<!DOCTYPE html>';
  markup += ReactDOMServer.renderToStaticMarkup(template);
  return markup;
}

export default function GetEmailBody(emailType, values) {
  if (emailType === 'account-confirmation-email') {
    return getEmailBody(<ConfirmationEmail
      firstName={values.firstName}
      confirmationCode={values.confirmationCode}
    />);
  }
  return '';
}
