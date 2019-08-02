//==========================================//
//               /api/students              //
//==========================================//

const { Router } = require('express');
const async = require('async');
const request = require('request-promise');
const config = require('config');
const { getToken } = require('./util');
const { getPlannerItemsMask, getPlannerItemsOAuth } = require('./modules/canvas');
const { getCurrentOauthToken } = require('../canvas-refresh');

const BASE_URL = `${config.get('osuApi.baseUrl')}/students`;

const router = new Router();

router.get('/planner-items', async (req, res) => {
  console.log('Before refreshing ' + req.user.canvasOauthToken);
  console.log('Current expire time from session ' + req.user.canvasOauthExpire + ' Current time ' + ((Date.now() / 1000) | 0));
  // if (((Date.now() / 1000) | 0) > req.user.canvasOauthExpire) {
  // Access token is expiered and we need to get a new one
  //  await getCurrentOauthToken(req.user.osuId, results => {
  //   req.user.canvasOauthToken = results.accessToken;
  //   req.user.canvasOauthExpire = results.expireTime;
  //   req.user.isCanvasOptIn = results.canvasOptIn;
  //   console.log('Performing refresh ' + req.user.canvasOauthToken);
  // })
  // }
  let user = await getCurrentOauthToken(req.user);
  req.user = user;
  // console.log(user);
  try {
    // console.log(req.user);
    let plannerApiResponse;
    // Administrators that have masqueraded get access to this endpoint (else you get oauth)
    if (req.user.isAdmin && req.user.masqueradeId) {
      plannerApiResponse = await getPlannerItemsMask(req.user.masqueradeId);
    } else if (req.user.canvasOauthToken) {
      console.log('Token we tried to use was ' + req.user.canvasOauthToken);
      plannerApiResponse = await getPlannerItemsOAuth(req.user.canvasOauthToken);
      // plannerApiResponse = await getPlannerItemsMask(req.user.masqueradeId || req.user.osuId);
    } else {
      plannerApiResponse = [];
    }

    // Filter out just assignments
    // const assignments = apiResponse.filter(item => item.assignment !== undefined);
    res.send(plannerApiResponse);
  } catch (err) {
    console.log(err);
    res.status(500).send('Unable to retrieve planner items.');
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
