// API method to return all contributions
'use strict';
const Boom = require("@hapi/boom");

const Contribution = require('../models/contribution');

const Contributions = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const contributions = await Contribution.find();
      return contributions;
    },
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
      const contribution = await Contribution.findOne({ _id: request.params.id });
      if (!contribution){
        return Boom.notFound ("No contribution with this id"); // Added official HTTP "not found" error
      }
      return contribution;
  } catch (err){
    return Boom.notFound("No contribution with this id");
  }
  },
},
};

module.exports = Contributions;