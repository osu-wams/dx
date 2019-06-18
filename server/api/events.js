//==========================================//
//                /api/events               //
//==========================================//
const { Router } = require('express');
const { getEvents, getAcademicCalendarEvents } = require('./modules/localist');

const events = Router();

events.get('/', (req, res, next) => {
  getEvents(req.query)
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send('Unable to retrieve events.');
      next(err);
    });
});

events.get('/academic-calendar', (req, res, next) => {
  getAcademicCalendarEvents()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send('Unable to retrieve academic calendar events.');
      next(err);
    });
});

module.exports = events;
