'use strict';

const path = require('path');

// Mirrors the asset transform create-react-app used: static assets import as their file name.
module.exports = {
  process(src, filename) {
    return { code: `module.exports = ${JSON.stringify(path.basename(filename))};` };
  },
};
