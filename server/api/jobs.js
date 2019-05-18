//==========================================//
//               /api/jobs              //
//==========================================//
const { Router } = require('express');
const { getJobs } = require('./modules/handshake');

const jobs = new Router();
jobs.get('/', async (req, res) => {
  try {
    const jobs = await getJobs();
    const corvallisJobs = jobs.jobs.filter(
      job => job.employment_type_id !== 3 && job.employer.location.city === 'Corvallis'
    );
    const simulateApi = {
      success: true,
      jobs: corvallisJobs
    };
    res.send(simulateApi);
  } catch (err) {
    res.status(500).send('Unable to retrieve jobs.');
  }
});

module.exports = jobs;
