const Contributions = require('./app/api/contributions');

module.exports = [
  { method: 'GET', path: '/api/contributions', config: Contributions.find }
 ];