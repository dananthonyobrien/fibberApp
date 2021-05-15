// API method to return all contributions
'use strict';

const Contribution = require('../models/candidate');

const Contributions = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const contributions = await Contribution.find();
      return contributions;
    },
  },
};

module.exports = Contributions;