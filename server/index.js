/* eslint-disable no-console */

const app = require('express')();

const PORT = process.env.port || 4000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
