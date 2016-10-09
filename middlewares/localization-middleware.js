export default function () {
  return (req, res, next) => {
    /* eslint-disable */
    req.locale = 'en';
    res.localizeRender = (view, model) => {
      model.locale = req.locale;
      return res.render(view, model);
    };
    next();
  };
  /* eslint-enable */
}
