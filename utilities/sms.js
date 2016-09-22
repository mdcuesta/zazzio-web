import Nexmo from 'nexmo';

export default class Sms {
  send(sender, recipient, message, callback) {
    const nexmo = new Nexmo({
      apiKey: process.env.NEXMO_API_KEY || '045274a3',
      apiSecret: process.env.NEXMO_API_SECRET || '51438041f498dcb4',
    }, { debug: process.env.NODE_ENV !== 'production' });

    const options = {};

    nexmo.message.sendSms(sender, recipient, message, options, callback);
  }
}
