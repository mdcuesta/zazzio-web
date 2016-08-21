'use strict';

import SendGrid from 'sendgrid';

export default class Mailer {

  send(sendTo, sender, subject, body, callback) {
    let helper = SendGrid.mail;
    
    let toEmail = new helper.Email(sendTo);
    let fromEmail = new helper.Email('noreply@zazz.io');
    let content = new helper.Content('text/plain', body);
    let mail = new helper.Mail(fromEmail, subject, toEmail, content)

    let sendgrid = SendGrid(process.env.SENDGRID_API_KEY 
      || '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');

    let request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sendgrid.API(request, function(error, response) {
      callback(error, response);
    });
  }
}