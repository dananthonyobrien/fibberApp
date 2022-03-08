"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const contributionSchema = new Schema({
  title: String,
  name: String,
  age: String, 
  teddyName: String,
  teddyType: String,
  food: String,
  country: String,
  genre: String,
  likes: Number,
  weather: String,
  image: String,
  story: String,
  contributor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}
);

module.exports = Mongoose.model("Contribution", contributionSchema);
