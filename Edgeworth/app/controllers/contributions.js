"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");

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
          name: data.name,
          type: data.type,
          description: data.description,
          location: data.location,
          contributor: user._id,
        });
        await newContribution.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", { errors: [{ message: err.message }] });
      }
    },
  },
};

module.exports = Contributions;
