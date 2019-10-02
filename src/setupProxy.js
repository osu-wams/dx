// Note: This needs to be a .js file. Using a .ts won't work with CRA.

const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy('/healthcheck', { target: 'http://localhost:4000/' }));
  app.use(proxy('/api', { target: 'http://localhost:4000/' }));
  app.use(proxy('/login', { target: 'http://localhost:4000/' }));
  app.use(proxy('/canvas', { target: 'http://localhost:4000/' }));
  app.use(proxy('/logout', { target: 'http://localhost:4000/' }));
};
