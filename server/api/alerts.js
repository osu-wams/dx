const { Router } = require('express');
const Parser = require('rss-parser');

const parser = new Parser();

const BASE_URL = 'https://www.getrave.com/rss/oregonstate/channel2';

const alerts = Router();

alerts.get('/', async (req, res) => {
  try {
    // Rave Alerts come as an RSS feed
    const { items } = await parser.parseURL(BASE_URL);
    res.send(items);
    console.log(items);
  } catch (err) {
    res.status(500).send('Unable to retrieve alerts.');
  }
});

module.exports = alerts;
