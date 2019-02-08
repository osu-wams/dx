module.exports = {
    apps: [
      {
        name: 'dx',
        script: 'index.js',
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };
  