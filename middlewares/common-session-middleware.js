export default function () {
  return (req, res, next) => {
    /* eslint-disable */
    req.locale = 'en';

    if (typeof req.cookies.locale !== 'undefined'
      && req.cookies.locale !== null) {
      req.locale = req.cookies.locale;
    }

    res.originalRender = res.render;

    res.render = (view, model) => {
      if (typeof model === 'undefined') {
        model = {};
      }
      
      if (typeof model.locale === 'undefined' || model.locale === null) {
        model.locale = req.locale;
      }

      if (typeof req.user !== 'undefined' && typeof model.user === 'undefined') {
        model.user = req.user;
      }

      return res.originalRender(view, model);
    };
    next();
  };
  /* eslint-enable */
}
