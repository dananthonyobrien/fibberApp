// API Tests
// To run tests go to Terminal in the top bar of Visual Studio Code > Run Task > npm test
// Or navigate to test folder on command line and enter npm test

"use strict";

const assert = require("chai").assert;
const axios = require("axios");

// Retreive all contributions test
suite("Contribution API tests", function () {
  test("get contributions", async function () {
    const response = await axios.get("http://localhost:3000/api/contributions");
    console.log(response.data);
  });

  // Retrieve a contribution test
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
  /*
    test("create a contribution", async function () {
      const contributionUrl = "http://localhost:3000/api/contributions";
      const newContribution = {
        name: "Test 2",
        type: "person",
        location: "Munster",
        description: "Test 2",
        likes: 10,
  
      };
  
      const response = await axios.post(contributionUrl, newContribution);
      const returnedContribution = response.data;
      assert.equal(201, response.status);
  
      assert.equal(returnedContribution.name, "Test 2");
      assert.equal(returnedContribution.type, "person");
      assert.equal(returnedContribution.location, "Munster");
      assert.equal(returnedContribution.description, "Test 2");
      assert.equal(returnedContribution.likes, 10);
  
  
    }); 
    */

  // Delete contribution test
  test("delete a contribution", async function () {
    let response = await axios.get("http://localhost:3000/api/contribution");
    let contributions = response.data;
    const originalSize = contributions.length;

    const oneContributioneUrl = "http://localhost:3000/api/candidates/" + contributions[0]._id;
    response = await axios.get(oneContributionsUrl);
    const oneContribution = response.data;
    assert.equal(oneContribution.firstName, "Robert");

    response = await axios.delete("http://localhost:3000/api/candidates/" + contributions[0]._id);
    assert.equal(response.data.success, true);

    response = await axios.get("http://localhost:3000/api/candidates");
    contributions = response.data;
    assert.equal(contributions.length, originalSize - 1);
  });

});