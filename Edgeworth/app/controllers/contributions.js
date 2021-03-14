"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");

const Contributions = {
  home: {
    handler: async function (request, h) {
      const candidates = await Candidate.find().lean();
      return h.view("home", { title: "Make a Contribution", candidates: candidates });
    },
  },
  report: {
    handler: async function (request, h) {
      const contributions = await Contribution.find().populate("donor").populate("candidate").lean();
      return h.view("report", {
        title: "Contributions to Date",
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

        const rawCandidate = request.payload.candidate.split(",");
        const candidate = await Candidate.findOne({
          lastName: rawCandidate[0],
          firstName: rawCandidate[1],
        });

        const newContribution = new Contribution({
          amount: data.amount,
          method: data.method,
          donor: user._id,
          candidate: candidate._id,
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
