const distributionUrl = $('meta[name="distribution-url"]').attr('content');
const version = $('meta[name="app-version"]').attr('content');
const appUrl = $('meta[name="app-url"]').attr('content');

class CDNHelper {
  cdn(path) {
    return `${distributionUrl}/${version}/${path}`;
  }

  action(path) {
    return `${appUrl}/${path}`;
  }
}

const helper = new CDNHelper();

export default helper;
