const pjson = require('../../package.json');

const distributionUrl = process.env.CDN_DISTRIBUTION_URL || '';
const version = pjson.version;

const appUrl = process.env.APP_DOMAIN || '';

class CDNHelper {
  cdn(path) {
    return `${distributionUrl}/${version}/${path}`;
  }

  action(path) {
    return `${appUrl}/${path}`;
  }
}

const helper = new CDNHelper();

module.exports = helper;
