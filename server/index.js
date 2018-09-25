/* eslint-disable no-console */

const express = require('express');
const logger = require('./logger');

const app = express();

const PORT = process.env.port || 4000;

app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
