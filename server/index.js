require('dotenv').config();

const Hapi = require('hapi');
const env = require('./core/helpers/env');
const Core = require('./core/index');
const Africa = require('africa.js');
const { MySQL, MariaDB, PostgreSQL, SQLite, SQLServer } = require('africa.js');

/* *******************************
      Information Objects
******************************** */
let dbConfig = {
  host: env('DB_HOST'),
  user: env('DB_USER'),
  password: env('DB_PASS'),
  database: env('DB_NAME')
};

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

/* *******************************
  Starts DB by the client on .env
******************************** */
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

/* *******************************
      Start plasma globals
******************************** */

global.env = env;
global.App = appGlobals;
global.Africa = Africa;
global.DB = DB;

/* *******************************
  Creates a instance of the Server
******************************** */
const Server = new Hapi.server(App.server);

/* *********************************
 Setup listeners and Loads the Core
********************************** */
Server.on('start', function(err) {
  Core.load(Server); // Load server resources

  console.log('Server running at PORT', Server.info.port);
});

Server.on('stop', function(err) {
  console.warn('Server stoped. ', err);
});

/* *******************************
  Start the Server
******************************** */
Server.start();