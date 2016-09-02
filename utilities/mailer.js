import SendGrid from 'sendgrid';

export default class Mailer {

  send(sendTo, sender, subject, body, callback) {
    const helper = SendGrid.mail;
    const api = SendGrid.API;
    const sendGrid = SendGrid;

    const toEmail = new helper.Email(sendTo);
    const fromEmail = new helper.Email('noreply@zazz.io');
    const content = new helper.Content('text/plain', body);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    const sendgrid = sendGrid(process.env.SENDGRID_API_KEY
      || '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');

    const request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    api(request, (error, response) => {
      callback(error, response);
    });
  }
}
