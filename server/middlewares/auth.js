// Auth middleware with JSON Web Token
const jwt = require('jsonwebtoken');
const Boom = require('boom');

module.exports = function (Server) {
  let unauthorized = Boom.unauthorized('Token invalid or expired!');

  const auth = function () {
    return {
      authenticate: function (request, res) {
        const token = request.headers.authorization;
        
        if (!token) {
          return res(unauthorized).code(401);
        } else {
          let decoded = jwt.verify(token, env('JWT_HASH'));
          
          if(!decoded) return res(unauthorized).code(401);

          res.continue({ credentials: decoded });
        }   
      }
    }
  };

  //Register validation schema
  Server.auth.scheme('jwt', auth);
  Server.auth.strategy('default', 'jwt');
}