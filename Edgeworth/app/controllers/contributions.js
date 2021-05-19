"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");
var sanitizeHtml = require('sanitize-html'); //Added sanitizeHtml to sanitize user input
const { logger } = require("handlebars");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");


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
    handler: async function (request, h) {
      try {
        const contribution = await Contribution.findById(request.params._id).lean();
        return h.view("edit-contribution", { title: "Edit Contribution", contribution: contribution });
      } catch (err) {
        return h.view("edit-contribution", { errors: [{ message: err.message }] });
      }
    },
  }, 
  

  //showContribution: {
  //    handler: async function(request, h) {
  //      return h.view("contribute", { title: "Edit Contribution", user: user });
  //    }
  //  },


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
          return h.view("edit-contribution", {
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
          const contribution = await Contribution.findById(id); 
          console.log("Contribution:" + contribution);
          contribution.name = contributionEdit.name;
          console.log("Contributiion Edit:" + contributionEdit.name)
          contribution.type = contributionEdit.type;
          contribution.description = contributionEdit.description;
          contribution.location = contributionEdit.location;
          await contribution.save();
          return h.view("report", {contribution});
        } catch (err){
          return h.view("report", { errors: [{ message: err.message }] });

        }
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

