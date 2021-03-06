import fs from 'fs';
import { resolve } from 'path';

const dotenv = resolve(process.cwd(), `./env/.env`);

const BUILD_ENV = process.env.BUILD_ENV || 'development';

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  // loaded in during build in docker
  `${dotenv}.${BUILD_ENV}`,
  dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// Grab NODE_ENV and VUE_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const VUE_APP = /^(VUE_APP_|runtime)/i;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(key => VUE_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development',
      }
    );
  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

export { getClientEnvironment };
