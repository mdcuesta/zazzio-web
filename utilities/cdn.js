const pjson = require('../package.json');

const distributionUrl = process.env.CDN_DISTRIBUTION_URL || '';
const version = pjson.version;

class CDNHelper {
  url(url) {
    return `${distributionUrl}/${version}/${url}`;
  }
}

const helper = new CDNHelper();

module.exports = helper;
