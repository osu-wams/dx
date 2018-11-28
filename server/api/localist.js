const { Router } = require('express');
const request = require('request-promise');
const Parser = require('rss-parser');

const parser = new Parser();

const BASE_URL = 'https://events.oregonstate.edu/api/2';
const ACADEMIC_CALENDAR_URL =
  'https://events.oregonstate.edu/widget/view?schools=oregonstate&days=365&num=10&tags=academic+calendar&format=rss';

const localist = Router();

localist.get('/', async (req, res) => {
  try {
    let urlParams;
    if (req.query) {
      urlParams = Object.keys(req.query)
        .map(key => `${key}=${req.query[key]}`)
        .join('&');
    }
    const { data } = await request.get(`${BASE_URL}/events?${urlParams}`);
    res.send(data.events);
  } catch (err) {
    res.status(500).send(err);
  }
});

localist.get('/academic-calendar', async (req, res) => {
  try {
    // Note: Getting academic calendar items via RSS as a workaround due to
    //       unlisted/restricted events not being visible via API.
    const { items } = await parser.parseURL(ACADEMIC_CALENDAR_URL);
    res.send(items);
  } catch (err) {
    res.status(500).send('Unable to retrieve academic calendar.');
  }
});

module.exports = localist;
