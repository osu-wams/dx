const localist = require('./localist');

// Mount sub-routers onto /api/[resource-name]
module.exports = app => {
  app.use('/api/events', localist);
};
