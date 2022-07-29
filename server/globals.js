const Africa = require('africa.js');
const env = require('./core/helpers/env');

const { MySQL, MariaDB, PostgreSQL, SQLite, SQLServer } = require('africa.js');

/**
 * Database config
 * @type {Object}
 */
let dbConfig = {
  host: env('DB_HOST'),
  user: env('DB_USER'),
  password: env('DB_PASS'),
  database: env('DB_NAME')
};

/**
 * App globals
 * @type {Object}
 */
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
global.Africa = Africa;
global.DB = switch(env('DB_CLIENT')) {
  case 'MySQL':
    return new MySQL(...dbConfig);
    break;

  case 'MariaDB':
    return new MariaDB(...dbConfig);
    break;

  case 'PostgreSQL':
    return new PostgreSQL(...dbConfig);
    break;

  case 'SQLite':
    return new SQLite(dbConfig.database);
    break;

  case 'SQLServer':
    return new SQLServer(...dbConfig);
    break;
};