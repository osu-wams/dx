/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

// App Configuration
const app = express();
app.use(bodyParser.json());

const PORT = process.env.port || 4000;

// Import API Routes
require('./api')(app);

// Start Server
app.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
