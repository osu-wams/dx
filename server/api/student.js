//==========================================//
//               /api/students              //
//==========================================//

const { Router } = require('express');
const request = require('request-promise');
const config = require('config');
const { getToken } = require('./util');
const { getUpcomingAssignments } = require('./modules/canvas');

const BASE_URL = `${config.get('osuApi.baseUrl')}/students`;

const router = new Router();

router.get('/assignments', async (req, res) => {
  try {
    const apiResponse = await getUpcomingAssignments(req.user.masqueradeId || req.user.osuId);
    res.send(apiResponse);
  } catch (err) {
    res.status(500).send('Unable to retrieve assignments.');
  }
});

router.get('/academic-status', async (req, res) => {
  try {
    const term = req.query.term || 'current';
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/academic-status?term=${term}`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve academic status.');
  }
});

router.get('/account-balance', async (req, res) => {
  try {
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/account-balance`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve account balance.');
  }
});

router.get('/account-transactions', async (req, res) => {
  try {
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/account-transactions`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve account transactions');
  }
});

router.get('/class-schedule', async (req, res) => {
  try {
    const term = req.query.term || 'current';
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/class-schedule?term=${term}`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve class schedule.');
  }
});

router.get('/gpa', async (req, res) => {
  try {
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/gpa`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve GPA data.');
  }
});

router.get('/grades', async (req, res) => {
  try {
    const term = req.query.term;
    let termParam = '';
    if (term) {
      termParam = `?term=${term}`;
    }
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/grades${termParam}`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve grades.');
  }
});

router.get('/holds', async (req, res) => {
  try {
    const bearerToken = await getToken();
    const apiResponse = await request({
      method: 'GET',
      url: `${BASE_URL}/${req.user.masqueradeId || req.user.osuId}/holds`,
      auth: { bearer: bearerToken },
      json: true
    });
    res.send(apiResponse.data);
  } catch (err) {
    res.status(500).send('Unable to retrieve account holds.');
  }
});

module.exports = router;
