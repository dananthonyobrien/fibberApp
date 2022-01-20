"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");
var sanitizeHtml = require('sanitize-html'); //Added sanitizeHtml to sanitize user input
const { logger } = require("handlebars");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");
var likes = 0;


const Contributions = {
  home: {
    handler: async function (request, h) {
      const contributions = await Contribution.find().lean(); 
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
          title: sanitizeHtml(data.title),
          name: sanitizeHtml(data.name),                // sanitize user input
          age: sanitizeHtml(data.age),        // sanitize user input
          country: sanitizeHtml(data.country),  // sanitize user input
          teddyName: sanitizeHtml(data.teddyName),
          teddyType: sanitizeHtml(data.teddyType),
          food: sanitizeHtml(data.food),
          genre: sanitizeHtml(data.genre),
          likes: likes,   //added like for like button
          contributor: user._id,
        });
       

        await newContribution.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
  // Delete method added
  deleteContribution: {
    auth: false,
    handler: async function (request, h) {
      const contribution = Contribution.findById(request.params._id);
      console.log("Removing contribution: " + contribution);
      await contribution.deleteOne();
      return h.redirect("/report");
    }
  },

  // Show method needed to add contribution values to edit page
  showContribution: {
    handler: async function (request, h) {
      try {
        const contribution = await Contribution.findById(request.params._id).lean();
        return h.view("edit-contribution", { title: "Edit Contribution", contribution: contribution });
      } catch (err) {
        return h.view("edit-contribution", { errors: [{ message: err.message }] });
      }
    },
  },


  // update contribution built with settings update and ICT1 update, but not working
  updateContribution: {
    validate: {
      payload: {
        name: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h.view("update-contribution", {
          title: "Sign up error",
          errors: error.details,
        })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const contributionEdit = request.payload;
        console.log(contributionEdit);
        const id = request.params._id;
        console.log("ID: " + id);
        const contribution = await Contribution.findById(id);
        console.log("Contribution:" + contribution);
        contribution.name = contributionEdit.name;
        console.log("Contributiion Edit:" + contributionEdit.name)
        contribution.type = contributionEdit.type;
        contribution.description = contributionEdit.description;
        contribution.location = contributionEdit.location;
        await contribution.save();
        return h.view("report", { contribution });
      } catch (err) {
        return h.view("report", { errors: [{ message: err.message }] });

      }
    }
  },

// Like contribution method that adds 1 to star counter every time button is clicked
  likeContribution: {
    auth: false,
    handler: async function (request, h) {
      const contribution = await Contribution.findById(request.params._id);
      console.log(contribution.likes)
      contribution.likes++;
      console.log("Contribution " + contribution._id + " has " + contribution.likes + " likes");

      await contribution.save();
      return h.redirect("/report", {
        contribution: likes,
      });
    }
  },

};

module.exports = Contributions;


