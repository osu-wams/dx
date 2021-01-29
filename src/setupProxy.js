// Note: This needs to be a .js file. Using a .ts won't work with CRA (true as of 03/2020)

const { createProxyMiddleware } = require('http-proxy-middleware');

const localhostUrl = 'http://localhost:4000/';

const options = {
  target: localhostUrl,
  changeOrigin: false,
};

const devProxy = createProxyMiddleware(options);

module.exports = (app) => {
  app.use('/healthcheck', devProxy);
  app.use('/api', devProxy);
  app.use('/login', devProxy);
  app.use('/canvas', devProxy);
  app.use('/logout', devProxy);
};
