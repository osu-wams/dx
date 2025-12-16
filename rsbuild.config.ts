import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';

const { publicVars, rawPublicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginNodePolyfill(),
    pluginStyledComponents(),
  ],
  output: {
    distPath: {
      root: 'build',
    },
    polyfill: 'usage',
  },
  source: {
    define: {
      ...publicVars,
      'process.env': JSON.stringify(rawPublicVars),
    },
  },
});
