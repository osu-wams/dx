//==========================================//
//                /api/events               //
//==========================================//
const { Router } = require('express');
const { getEvents, getAcademicCalendarEvents } = require('./modules/localist');

const events = Router();

events.get('/', (req, res) => {
  getEvents(req.query)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send('Unable to retrieve events.');
    });
});

events.get('/academic-calendar', (req, res) => {
  getAcademicCalendarEvents()
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send('Unable to retrieve academic calendar events');
    });
});

module.exports = events;
