module.exports = function(app) {
  app.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function(req, res) {
      res('').type('image/x-icon').code(200);
    }
  });

  app.route({
    method: 'GET',
    path: '/{path}',
    handler: {
      directory: {
        path: './public/',
        redirectToSlash: true,
        index: true
      }
    }
  });
  
}