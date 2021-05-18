"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");
var sanitizeHtml = require('sanitize-html'); //Added sanitizeHtml to sanitize user input
const { logger } = require("handlebars");
const Joi = require("@hapi/joi");


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
          likes: data.like,   //added like for like button
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
  deleteContribution: {
    auth: false,    
    handler: async function (request, h) {
      const contribution = Contribution.findById(request.params._id);
          console.log("Removing contribution: " + contribution);
          await contribution.deleteOne();
          return h.redirect("/report"); 
        }
      },

  
  showContribution: {
      handler: async function(request, h) {
        const contribution = Contribution.findById(request.params._id);
        return h.view("contribute", { title: "Edit Contribution", user: user });
      }
    },


    updateContribution: {
      handler: async function(request, h) {
        const contribution = Contribution.findById(request.params._id);
        return h.view("contribute", { title: "Edit Contribution", user: user });
      },
      validate: {
        payload: {
          name: Joi.string().required(),
          type: Joi.string().required(),
          descritption: Joi.string().email().required(),
          location: Joi.string().required(),
        },
        options: {
          abortEarly: false,
        },
        failAction: function (request, h, error) {
          return h
            .view("contribute", {
              title: "Sign up error",
              errors: error.details,
            })
            .takeover()
            .code(400);
        },
      },
      handler: async function (request, h) {
          const contributionEdit = request.payload;
          const contribution = Contribution.findById(request.params._id); //cut as contribution already defined above in render?
          contribution.name = contributionEdit.name;
          contribution.type = contributionEdit.type;
          contribution.description = contributionEdit.description;
          contribution.location = contributionEdit.location;
          await contribution.save();
          return h.redirect("/report");
        
        }
      },
    

    likeContribution: {
      auth: false,    
      handler: async function (request, h) {
        const contribution = Contribution.findById(request.params._id);
            let like = 0;
            let likes = like + 1;
            console.log("Contribution " + contribution + "has" + likes + "likes" );
            


            return h.redirect("/report", {
              like: like,
            });
          }
        }, 

};

module.exports = Contributions;

