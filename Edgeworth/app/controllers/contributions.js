"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");
var sanitizeHtml = require('sanitize-html'); //Added sanitizeHtml to sanitize user input
const { logger } = require("handlebars");


const Contributions = {
  home: {
    handler: async function (request, h) {
      const candidates = await Candidate.find().lean();
      return h.view("home", { title: "Make a Contribution" });
    },
  },
  report: {
    handler: async function (request, h) {
      const contributions = await Contribution.find().populate("contributor").lean();
      return h.view("report", {
        title: "Contributions",
        contributions: contributions,
      });
    },
  },
  contribute: {
    handler: async function (request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;
        const newContribution = new Contribution({
          name: sanitizeHtml(data.name),                // sanitize user input
          type: sanitizeHtml(data.type),                // sanitize user input 
          description: sanitizeHtml(data.description),  // sanitize user input
          location: sanitizeHtml(data.location),        // sanitize user input
          contributor: user._id,
        });
        await newContribution.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  
  deleteContribution: {
    auth: false,    
    handler: async function (request, h) {
      const contribution = Contribution.findById(request.params._id);
          console.log("Removing contribution: " + contribution);
          await contribution.deleteOne();
          return h.redirect("/report"); 
        }
      },

  
  /*deleteOne: {
    auth: false,
    handler: async function (request, h) {
      //const contributionId = request.params.id;
      //contribution.removeContribution(contributionId);
      //return h.direct('/report');

      const contribution = await Contribution.remove({ _id: request.params.id });
      if (contribution) {
        return h.redirect("/report");
        //return h.view("report", {
        //  contributions: contributions,
        //});
      }
      return Boom.notFound("id not found");
    }, 
  },*/


};

module.exports = Contributions;

