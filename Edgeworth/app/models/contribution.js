"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const contributionSchema = new Schema({
  name: String,
  type: String,
  description: String,
  location: String,
  likes: Number,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Contribution", contributionSchema);
