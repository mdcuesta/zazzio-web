const sha1 = require('sha1');
const pjson = require('../package.json');

const version = sha1(pjson.version);

export default version;
