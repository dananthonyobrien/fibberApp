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
create: {
  auth: false,
  handler: async function (request, h) {
    const newCandidate = new Candidate(request.payload);
    const candidate = await newCandidate.save();
    if (candidate) {
      return h.response(candidate).code(201);
    }
    return Boom.badImplementation("error creating candidate");
  },
},

deleteAll: {
  auth: false,
  handler: async function (request, h) {
    await Contribution.remove({});
    return { success: true };
  },
},

deleteOne: {
  auth: false,
  handler: async function (request, h) {
    const contribution = await Contribution.remove({ _id: request.params.id });
    if (contribution) {
      return { success: true };
    }
    return Boom.notFound("id not found");
  },
},

};

module.exports = Contributions;