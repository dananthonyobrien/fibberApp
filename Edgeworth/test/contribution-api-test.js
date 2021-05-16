"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Contribution API tests", function () {
  test("get contributions", async function () {
    const response = await axios.get("http://localhost:3000/api/contributions");
    console.log(response.data);
  });
  test("get one contribution", async function () {
    let response = await axios.get("http://localhost:3000/api/contributions");
    const contributions = response.data;
    assert.equal(7, contributions.length);

    const oneContributionUrl = "http://localhost:3000/api/contributions/" + contributions[0]._id;
    response = await axios.get(oneContributionUrl);
    const oneContribution = response.data;

    assert.equal(oneContribution.name, "Robert Boyle");
    assert.equal(oneContribution.type, "person");
    assert.equal(oneContribution.location, "Munster");
  }); 

  /*test("create a contribution", async function () {
    const contributionUrl = "http://localhost:3000/api/contributions";
    const newContribution = {
      name: "Robert Doyle",
      type: "person",
      location: "Munster"

    };

    const response = await axios.post(contributionUrl, newContribution);
    const returnedContribution = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedContribution.name, "Robert Doyle");
    assert.equal(returnedContribution.type, "person");
    assert.equal(returnedContribution.location, "Munster");
  }); 
  */
});