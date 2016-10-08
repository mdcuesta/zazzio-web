import CSurf from 'csurf';

const csrf = CSurf;

export default function configure(app) {
  const csurf = csrf({ cookie: true });
  app.use((req, res, next) => {
    if (req.url.startsWith('/file/photo/upload/complete')) {
      // exclude public hooks
      next();
    } else {
      csurf(req, res, next);
    }
  });
}
