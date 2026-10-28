import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

export default tseslint.config(
  { ignores: ['build/**', 'coverage/**', 'node_modules/**', 'cypress/**', '.yalc/**'] },
  // Older eslint-disable comments remain in the code for rules this config does not enable.
  { linterOptions: { reportUnusedDisableDirectives: 'off' } },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    settings: { react: { version: 'detect' } },
    plugins: { 'react-hooks': reactHooks },
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      jestDom.configs['flat/recommended'],
    ],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/**/*.test.{js,jsx,ts,tsx}', 'src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
    extends: [testingLibrary.configs['flat/react']],
    rules: {
      // user-event v13 (the newest release that supports React 17) is synchronous.
      'testing-library/await-async-events': 'off',
      // Rules added to the plugin's recommended set after this suite was written.
      'testing-library/no-manual-cleanup': 'off',
      'testing-library/no-render-in-lifecycle': 'off',
      'testing-library/no-unnecessary-act': 'off',
      'testing-library/no-wait-for-multiple-assertions': 'off',
      'testing-library/prefer-presence-queries': 'off',
    },
  }
);
