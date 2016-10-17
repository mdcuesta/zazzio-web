class ResourceHelper {
  getResource(name, locale = 'en') {
    return require(`../localization/${locale}/${name}`); // eslint-disable-line
  }
}

const helper = new ResourceHelper();

export default helper;
