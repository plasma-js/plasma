'use strict'

const Africa = require('africa.js');
const { MySQL, MariaDB, PostgreSQL, SQLite, SQLServer } = require('africa.js');
const env = require('./core/helpers/env');

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
  },
  db: dbConfig
};

/**
 * DB global
 * @type {Class Instance}
 */
let DB = undefined;

switch(env('DB_CLIENT')) {
  case 'MySQL':
  case 'mysql':
    return new MySQL(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database);
    break;

  case 'MariaDB':
  case 'mariadb':
    return new MariaDB(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database);
    break;

  case 'PostgreSQL':
  case 'postgresql':
    return new PostgreSQL(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database);
    break;

  case 'SQLite':
  case 'sqlite':
    return new SQLite(dbConfig.database);
    break;

  case 'SQLServer':
  case 'sqlserver':
    return new SQLServer(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database);
    break;

  default:
    return new MySQL(dbConfig.host, dbConfig.user, dbConfig.password, dbConfig.database);
    break;
};

global.env = env;
global.App = appGlobals;
global.Africa = Africa;
global.DB = DB;