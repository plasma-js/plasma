const PlayerController = require('../controllers/app/api');

module.exports = function(app) {
  app.route({
    method: 'GET',
    path: '/api/player',
    handler: PlayerController.get
  });

  app.route({
    method: 'PATCH',
    path: '/api/player/play',
    handler: PlayerController.play
  });

  app.route({
    method: 'PATCH',
    path: '/api/player/pause',
    handler: PlayerController.pause
  });

  app.route({
    method: 'PATCH',
    path: '/api/player/previous',
    handler: PlayerController.previous
  });

  app.route({
    method: 'PATCH',
    path: '/api/player/next',
    handler: PlayerController.next
  });
}