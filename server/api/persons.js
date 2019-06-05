//==========================================//
//               /api/persons              //
//==========================================//

const { Router } = require('express');
const request = require('request-promise');
const config = require('config');
const { getToken } = require('./util');

const BASE_URL = `${config.get('osuApi.baseUrl')}/persons`;
const persons = new Router();

// Main endpoint with general data about the person
persons.get('/', async (req, res) => {
  try {
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve person information.');
  }
});

// Meal Plan by osuuid - Apigee endpoint
persons.get('/meal-plans', async (req, res) => {
  try {
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/meal-plans`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve meal plans.');
  }
});

module.exports = persons;
