const knex = require('knex');
const env = require('./core/helpers/env');

/**
 * Knex query builder config
 * @type {Object}
 */
let knexConfig = {
  client: env('DB_CLIENT'),
  connection: {
    host: env('DB_HOST'),
    user: env('DB_USER'),
    password: env('DB_PASS'),
    database: env('DB_NAME')
  },
  migrations: {
    directory: './server/migrations/'
  },
  seeds: {
    directory: './server/seeds/'
  }
}

let appGlobals = {
  server: {
    host: env('SERVER_HOST'),
    port: env('SERVER_PORT'),
    routes: {
      files: {
        relativeTo: process.cwd() + '/public'
      }
    }
  },
  https: {
    enable: false,
    options: {}
  }
}

global.env = env;
global.App = appGlobals;
global.DB = knex(knexConfig);