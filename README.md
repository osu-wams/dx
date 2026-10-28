This project was originally bootstrapped with Create React App and now builds with [Vite](https://vite.dev/)
and runs its tests with [Jest](https://jestjs.io/).

## Requirements

- Node.js 24 (see `.nvmrc`; run `nvm use`)
- Yarn 1.x

## Scripts

| Command              | What it does                                                      |
| -------------------- | ----------------------------------------------------------------- |
| `yarn start`         | Vite dev server on port 3000 (proxies `/api`, `/login`, etc. to `localhost:4000`) |
| `yarn build`         | Type-checks with `tsc`, then writes a production build to `build/` |
| `yarn preview`       | Serves the production build locally                               |
| `yarn test`          | Jest in watch mode                                                |
| `yarn test:ci`       | Jest, single run                                                  |
| `yarn test:coverage` | Jest with coverage                                                |
| `yarn typecheck`     | `tsc --noEmit`                                                    |
| `yarn lint`          | ESLint (flat config in `eslint.config.mjs`)                       |
| `yarn lint:css`      | Stylelint over styled-components CSS                              |
| `yarn analyze`       | Production build plus an interactive bundle size report           |

Environment variables for the browser bundle keep the `REACT_APP_` prefix (`REACT_APP_ENV`,
`REACT_APP_EXPERIMENTAL`, `REACT_APP_GA_DEBUG`); see `vite.config.mts`.

Currently \${FONTAWESOME_TOKEN} is an environment variable.
Add it to your .bashrc .zshrc or preferred file of choice.

## Setup for Local Development OAuth flow

- Go to the server directory and read its README
- Run `export NODE_ENV=production`
  - To clear this run `unset NODE_ENV`
  - NOTE: We only need this if we want to test SAML and CANVAS OAUTH on our local machine

## Setup .env, then start the application

Use `.env` to set the development servers hostname so that the browser is automatically opened to the proper url during development and testing.

- Copy `.env.example` to `.env` then start the application

```sh
$ cp .env.example .env
$ yarn start
```

# Testing and Development Notes

## Working with dx-monorepo

**dx-monorepo instructions in it's own README however tldr:**

- After making the changes run `yarn build` in the git root (not the individual package)

You need to modify package.json to work with the dx-monorepo locally:

**In DX package.json**:

- Use local copy of dx-monorepo

```bash
"@osu-wams/hooks": "file:../dx-monorepo/packages/hooks",
"@osu-wams/lib": "file:../dx-monorepo/packages/lib",
```

- You might need to do `rm -rf node_modules` to get it to work nicely with the local version
- Run `yarn install`
- If there is a problem confirm your `yarn.lock` file calls your local version instead of the npm package

## Render helper

**Tests should use this `render` method provided by `src/util/test-utils.tsx`**:

    ...
    import { waitForElement } from '@testing-library/react';
    import { renderWithAllContexts as render } from '/src/util/test-utils'; // replace /src with relative path
    ...
    // An example test
    it('should render the resources page', async () => {
      const { getByTestId } = render(<Resources />);
      expect(getByTestId('resources-page')).toBeInTheDocument();
    });

## Testing production build locally

We have a simple docker onfig to be able to run production build locally. This is useful for testing IE / Edge on virtual machines, or troubleshoot anything that requires the compiled build code.

- Run `yarn build`
- Run `docker-compose up -d`
- Note: do this instead of `yarn start`
