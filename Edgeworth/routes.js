"use strict";

const Accounts = require("./app/controllers/accounts");
const Contributions = require("./app/controllers/contributions");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: "GET", path: "/home", config: Contributions.home },
  { method: "POST", path: "/contribute", config: Contributions.contribute },
  { method: "GET", path: "/contribute", config: Contributions.contribute },
  { method: "GET", path: "/report", config: Contributions.report },
  { method: 'GET', path: '/delete-contribution/{_id}', config: Contributions.deleteContribution },
  // { method: "GET", path: "/report/deleteOne/{id}", config: Contributions.deleteContribution },
  //{ method: 'GET', path: '/contribution/deletecontribution/:id', config: Contributions.deleteContribution },
  //{ method: "GET", path: "/contribute/{id}", config: Contributions.deleteOne },
  //{ method: 'GET', path: '/report/deletecontribution/{id}', config: Contributions.deleteContributions },
  // { method: 'POST', path: '/contribute', config: Contributions.deleteOne },// Added delete contribution route
  // { method: 'DELETE', path: '/contributions', config: Contributions.deleteAll }
  // { method: "GET", path: "report/delete/{id}", config: Contributions.report},  
  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
  // Route added to test XSS vurnerability
  {
    method: 'GET',
    path: '/welcome/{user}',
    handler: function (request, reply) {
        return 'Welcome ' + request.params.user;
    },
    config: {auth: false}
},
];
