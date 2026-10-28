// Babel is only used by Jest (babel-jest). Vite transforms the app with oxc and
// runs babel-plugin-styled-components through @rolldown/plugin-babel (see vite.config.ts).
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: ['babel-plugin-styled-components'],
};
