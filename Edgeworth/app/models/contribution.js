"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const contributionSchema = new Schema({
  title: String,
  name: String,
  country: String,
  genre: String,
  age: String, 
  teddyName: String,
  teddyType: String,
  food: String,
  likes: Number,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Mongoose.model("Contribution", contributionSchema);
