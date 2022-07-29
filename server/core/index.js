const consign = require('consign');
const path = require('path');

module.exports = {
  load(Server) {
    /**
     * Load scripts in folders async
     * @type {Promise}
     */
    consign({ 
        cwd: path.resolve(__dirname, '../'),
        verbose: false
      })
      .include('plugins')
      .then('middlewares')
      .then('routes')
      .into(Server);
  }
}