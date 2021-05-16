const Contributions = require('./app/api/contributions');

module.exports = [
  { method: 'GET', path: '/api/contributions', config: Contributions.find },
  { method: 'GET', path: '/api/contributions/{id}', config: Contributions.findOne },
  { method: 'POST', path: '/api/contributions', config: Contributions.create },
  { method: 'DELETE', path: '/api/contributions/{id}', config: Contributions.deleteOne },
  { method: 'DELETE', path: '/api/contributions', config: Contributions.deleteAll }
 ];
