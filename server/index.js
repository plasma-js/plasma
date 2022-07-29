// Dependencies and Modules
const Core = require('./core/index');
const Hapi = require('hapi');

module.exports = {
  init(cb, config) {
    // Creates a instance of Server
    const Server = new Hapi.Server();
    
    // Config our server
    Server.connection(App.server);

    // Set our Server Event Listeners
    serverListeners(Server);

    // Start the server
    Server.start();
  }
}

function serverListeners(Server) {
  Server.on('start', function(err) {
    Core.load(Server); // Load server resources

    console.log('Server running at PORT', Server.info.port);
  });

  Server.on('stop', function(err) {
    console.warn('Server stoped. ', err);
  });
}