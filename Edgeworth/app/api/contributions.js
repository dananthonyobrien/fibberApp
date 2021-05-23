// API method to return all, find one, delete one, and delete all POI contributions


'use strict';
const Boom = require("@hapi/boom");

const Contribution = require('../models/contribution');

// To access all POI contributions via APIs enter below in browser URL:
// http://localhost:3000/api/contributions

const Contributions = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const contributions = await Contribution.find();
      return contributions;
    },
  },

  // To access a particular POI contribution use 
  // http://localhost:3000/api/contributions/{contribution._id} 
  // Note: you can take a contribution id from the all contributions API above for testing

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const contribution = await Contribution.findOne({ _id: request.params.id });
        if (!contribution) {
          return Boom.notFound("No contribution with this id"); // Added official HTTP "not found" error
        }
        return contribution;
      } catch (err) {
        return Boom.notFound("No contribution with this id");
      }
    },
  },


  create: {
    auth: false,
    handler: async function (request, h) {
      const newContribution = new Contribution(request.payload);
      const contribution = await newContribution.save();
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

  // To delete a particular POI contribution, use Postman
  // select DELETE and add http://localhost:3000/api/contributions/60a96a0305053063ff197097

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