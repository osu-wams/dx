const auth = require('../auth');
const user = require('./user');
const masquerade = require('./masquerade');
const events = require('./events');
const student = require('./student');
const resources = require('./resources');
const alerts = require('./alerts');
const jobs = require('./jobs');
const announcements = require('./announcements');
const persons = require('./persons');

// Mount sub-routers onto /api/[resource-name]
module.exports = app => {
  app.use('/api/user', auth.ensureAuthenticated, user);
  app.use('/api/masquerade', auth.ensureAdmin, masquerade);
  app.use('/api/student', auth.ensureAuthenticated, student);
  app.use('/api/jobs', auth.ensureAuthenticated, jobs);
  app.use('/api/persons', auth.ensureAuthenticated, persons);
  app.use('/api/events', events);
  app.use('/api/resources', resources);
  app.use('/api/alerts', alerts);
  app.use('/api/announcements', announcements);
};
