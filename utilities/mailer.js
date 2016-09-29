import SendGrid from 'sendgrid';

const sendGrid = SendGrid;

export default class Mailer {
  constructor(apiKey) {
    this.sendgrid = sendGrid(apiKey);
    this.send = this.send.bind(this);
  }

  send(sendTo, sender, subject, body, callback) {
    const helper = SendGrid.mail;
    const toEmail = new helper.Email(sendTo);
    const fromEmail = new helper.Email(sender || 'noreply@zazz.io');
    const content = new helper.Content('text/html', body);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    const request = this.sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    const api = this.sendgrid.API;
    return api(request, (err, response) => {
      callback(err, response);
    });
  }
}
