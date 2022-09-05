require('dotenv').config();
require('./globals');

const Hapi = require('hapi');
const Core = require('./core/index');

/* *******************************
  Creates a instance of the Server
******************************** */
const Server = new Hapi.server(App.server);

/* *******************************
  Loads the Core
******************************** */
Core.load(Server);

/* *******************************
  Server events listeners
******************************** */
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