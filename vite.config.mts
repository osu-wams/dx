import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';

// Environment variables exposed to the browser bundle. They keep the CRA-era
// `process.env.REACT_APP_*` names so no application code had to change.
const REACT_APP_ENV_VARS = ['REACT_APP_ENV', 'REACT_APP_EXPERIMENTAL', 'REACT_APP_GA_DEBUG'];

// Paths forwarded to the local API server during development (was src/setupProxy.js).
const PROXIED_PATHS = ['/healthcheck', '/api', '/login', '/canvas', '/logout'];
const API_SERVER = 'http://localhost:4000';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['REACT_APP_', 'HOST']);

  const define = Object.fromEntries(
    REACT_APP_ENV_VARS.map((name) => [
      `process.env.${name}`,
      env[name] === undefined ? 'undefined' : JSON.stringify(env[name]),
    ])
  );

  const plugins: PluginOption[] = [
    react(),
    // styled-components babel plugin: readable class names in dev, `css` prop support,
    // and stable component ids. Only our own source is run through Babel.
    babel({
      include: /\/src\/.*\.[jt]sx?(?:$|\?)/,
      plugins: ['babel-plugin-styled-components'],
    }),
  ];
  if (process.env.ANALYZE) {
    plugins.push(visualizer({ filename: 'build/bundle-stats.html', open: true }));
  }

  return {
    plugins,
    define,
    resolve: {
      alias: {
        src: fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
      host: env.HOST || 'localhost',
      allowedHosts: env.HOST ? [env.HOST] : undefined,
      open: true,
      proxy: Object.fromEntries(
        PROXIED_PATHS.map((path) => [path, { target: API_SERVER, changeOrigin: true }])
      ),
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
  };
});
