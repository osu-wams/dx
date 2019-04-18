//==========================================//
//                /api/alerts               //
//==========================================//
const { Router } = require('express');
const { getAlerts } = require('./modules/rave-alerts');

const alerts = Router();

alerts.get('/', (req, res) => {
  getAlerts()
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.status(500).send('Unable to retrieve alerts.');
    });
});

module.exports = alerts;
