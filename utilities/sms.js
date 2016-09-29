import Nexmo from 'nexmo';

export default class Sms {
  constructor(options) {
    this.nexmo = new Nexmo({
      apiKey: options.apiKey,
      apiSecret: options.apiSecret,
    }, {
      debug: options.debug,
    });

    this.send = this.send.bind(this);
    this.verify = this.verify.bind(this);
  }

  send(sender, recipient, message, callback) {
    const options = {};
    this.nexmo.message.sendSms(sender, recipient, message, options, callback);
  }

  sendVerificationCode(number, callback) {
    this.nexmo.verify.request({
      number,
      brand: 'zazz.io',
    }, callback);
  }

  verify(requestId, code, callback) {
    this.nexmo.verify.check({
      request_id: requestId,
      code,
    }, callback);
  }
}
