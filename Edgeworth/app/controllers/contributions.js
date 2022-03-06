"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");
var sanitizeHtml = require('sanitize-html'); //Added sanitizeHtml to sanitize user input
const { logger } = require("handlebars");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");
var likes = 0;
//var imageUrl = "No image"
//var image = "https://images.unsplash.com/photo-1586410074293-91d01ca0db5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQxMjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMzOTAxODc&ixlib=rb-1.2.1&q=80&w=400";
//var weathers = "Not working";
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM("");
const jquery = require('jquery')(dom.window);
var axios = require('axios');

var currentWeather = "I can't see";
var prompt = "Hmmm, try scribbling another story."
var output = "Hmmm, our story engine has broken down. Try again."
var imageUrlReturn = "https://images.unsplash.com/photo-1586410074293-91d01ca0db5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQxMjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMzOTAxODc&ixlib=rb-1.2.1&q=80&w=400";

//onst weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${data.country}&appid=${apiKey}`;
const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=Cork&appid=${process.env.WEATHER_API_KEY}`;


async function getWeather() {
  let weather = {};
  const response = await axios.get(weatherRequest);
  if (response.status == 200) {
    weather = response.data
    //currentWeather = JSON.stringify(weather.weather[0].description)[0].toUpperCase();
    currentWeather = weather.weather[0].main;


  }
  console.log(weather);
  console.log(currentWeather);
  //console.log(weather.weather[0].description)
  //return currentWeather;
}


//getWeather();


const request = require('request');

const Contributions = {






  home: {
    handler: async function (request, h) {
      const contributions = await Contribution.find().lean();
      return h.view("home", { title: "Library" });
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




        // Get OpenAI story completion

        async function getGpt3() {
          const got = require('got');
          //const prompt = CAN ADD RANDOM PROMPT FUNCTION HERE;

          async () => {
            const url = 'https://api.openai.com/v1/engines/text-davinci-001/completions';
            const params = {
              "prompt": prompt, //"Write a two sentence children's story: ",  //"Type: Space adventure\nChildren\'s bedtime story: " + data.name + " and his teddy " + data.teddyType + " " + data.teddyName + " flew out the window on a spaceship they built from an old clock and a skateboard. They landed on the moon with a thud. I thought it would taste like " + data.food + " said Fluffy in a huff, as they stared down on the glimmering world below them.\n    \nType: " + data.genre + "\nChildren\'s bedtime story:\n\n\n",
              "max_tokens": 62,
              "temperature": 0.7,
              "frequency_penalty": 0.5
            };
            const headers = {
              'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
            };

            //try {
            const response = await got.post(url, { json: params, headers: headers }).json();
            output = response.choices[0].text; //`${prompt}${response.choices[0].text}`;
            console.log(output);
            // } catch (err) {
            //  console.log(err);
            //}

          }

          return output;

        };




        //var storyCompletion = "story not working" //getGpt3(); // //await getGpt3();




        // Get image url from Unsplash

        async function getImage() {
          //var imageUrl = "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQxMjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMzOTEzOTk&ixlib=rb-1.2.1&q=80&w=400";
          
      var config = {
            method: 'get',   
            url: `https://api.unsplash.com/photos/random?client_id=${process.env.IMAGE_API_KEY}&query=` + data.teddyType,
            headers: {
            }
          };

          await axios(config)

            .then(function (response) {
              console.log(JSON.stringify(response.data.urls.regular));
              console.log("Response type:" + response.type);
              imageUrlReturn = JSON.stringify(response.data.urls.regular);
              console.log(imageUrlReturn);
              // console.log("response.urls.regular:" + JSON.stringify(response.urls.regular));
              console.log("")

              //var imageUrl = JSON.stringify(response.data.urls.regular);
              // var imageUrlReg = String(imageUrl.urls.regular);
              // response.urls.regular
            })
            .catch(function (error) {
              console.log(error);
            });


          return imageUrlReturn;

        }






        // Get weather from OpenWeather API


        //var weathers = getWeather();




        // Prompts by genre

        var spacePrompts = { spacePrompt1, spacePrompt2 }
        var fairyPrompts = { fairyPrompt1, fairyPrompt2 }
        var junglePrompts = { junglePrompt1, junglePrompt2 }
        var seaPrompts = { seaPrompt1, seaPrompt2 }





        //Story stems choosen first based on genre and secondly at random 
        //Removed random function during testing
        async function chooseStem() {
          if (data.genre == "Space Adventure") {
            //prompt = spacePrompts[Math.floor(Math.random()*spacePrompts.length)]
            prompt = spacePrompt1;
          }
          else if (data.genre == "Fairy Tale") {
            //prompt = fairyPrompts[Math.floor(Math.random()*fairyPrompts.length)]
            prompt = fairyPrompt1;
          }
          else if (data.genre == "Jungle Explorer") {
            //prompt = junglePrompts[Math.floor(Math.random()*junglePrompts.length)]
            prompt = junglePrompt1;
          }
          else {
            //prompt = seaPrompts[Math.floor(Math.random()*seaPrompts.length)]
            prompt = seaPrompt1;
          }
          return prompt;
        }

        var spacePrompt1 = `

        Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
              supposed to be asleep in their home in ` + data.country + `. 
              \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
              \n"No", ` + data.teddyName + ` groaned.
              \n"Let's have an adventure!" ` + data.name + ` cried.
              \n"No, we'll get in trouble".
              \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
              \n` + data.teddyName + `'s ears twitched. "I'm listening".
              \n"The moon is made of `  + data.food + `", said ` + data.name + `. "What is the weather like, Co-Pilot ` + data.teddyName + `?"
              \n "` + currentWeather + `", ` + data.teddyName + `said, peering out the window.
             \n"Good. 3-2-1. Blastoff!". The bed flew out through the window and soared above the house. As they went
              higher and higher they could see the school and the park, and when they were higher still the sea and the
              mountains. While they gazed down at the world below, they did not see the moon coming until they crash
              landed on it.
              \n` + data.teddyName + `landed with his face in the dust and let out a groan. "Oh no ` + data.teddyName + `, are you
              okay, where are you hurt?" ` + data.teddyName + ` looked up and said, "It doesn't taste like ` + data.food + `at all!"
              \n"Oh well", said ` + data.name + `, "maybe it is Mars that tastes like` + data.food + `."
            
            `


        var spacePrompt2 = `

        Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
              supposed to be asleep in their home in ` + data.country + `. 
              \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
              \n"No", ` + data.teddyName + ` groaned.
              \n"Want to learn something new?" ` + data.name + ` cried.
              \n"No, I want to sleep".
              \n"What if the subject is ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
              \n` + data.teddyName + `'s eyes flashed open. "Tell me more".
              \n + ` + data.name + `pointed out the window, through the ` + currentWeather + `, at the sky.
              \n ` + data.name + `" let me tell you about the stars, said "` + data.name + ` pushing over the bedside lamp, so that it shone upon the wall. ` + data.name + `held up a ` + data.food + `and a grape up to the lamp, casting shadows. "Imagine this one is the sun", said ` + data.name + ` and this is the earth, orbiting at nineteen miles a second. "Wow! Show me more, cried ` + data.teddyName + ` thoughtfully chewing on the earth. "` + data.teddyName + `"! cried` + data.name + `.`



        var fairyPrompt1 = `

        Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
              supposed to be asleep in their home in ` + data.country + `. 
              \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
              \n"No", ` + data.teddyName + ` groaned.
              \n"Let's have an adventure!" ` + data.name + ` cried.
              \n"No, we'll get in trouble".
              \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
              \n` + data.teddyName + `'s ears twitched. "I'm listening".
              \n"We'll find lots of `  + data.food + ` in the fairy fort at the bottom of the garden", said ` + data.name + `. They snuck out the window throught the  ` + currentWeather + ` and down to the fairy fort.
             \n Inside, they could not see the house anymore, and instead saw a tiny castle.
              \n "What's that? whispered ` + data.teddyName + `
              \n "HELLO!" shouted` + data.name + `. A tiny head popped out of the castle turret. "What business have you in the lands of the Fairy Queen?"`



        var fairyPrompt2 = `

            Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
            supposed to be asleep in their home in ` + data.country + `. 
            \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
            \n"No", ` + data.teddyName + ` groaned.
            \n"Let's have an adventure!" ` + data.name + ` cried.
            \n"No, we'll get in trouble".
            \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
            \n` + data.teddyName + `'s ears twitched. "I'm listening".
            \n"We'll find lots of `  + data.food + ` in the in the fairy kingdom under the stairs", said ` + data.name + `. They snuck out the window throught the  ` + currentWeather + ` and down to the fairy fort.
           \n Inside, they could not see the house anymore, and instead saw a tiny castle.
            \n "What's that? whispered ` + data.teddyName + `
            \n "HELLO!" shouted` + data.name + `. A tiny head popped out of the castle turret. "What business have you in the lands of the Fairy King?"`


        var junglePrompt1 = `

        Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
              supposed to be asleep in their home in ` + data.country + `. 
              \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
              \n"No", ` + data.teddyName + ` groaned.
              \n"Let's have an adventure!" ` + data.name + ` cried.
              \n"No, we'll get in trouble".
              \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
              \n` + data.teddyName + `'s ears twitched. "I'm listening".
              \n"We'll find lots of `  + data.food + ` in the jungle", said ` + data.name + `. 
             \n "Where will we find a jungle," ` + data.teddyName + `asked? 
             \n "Jungles are hot and humid with lots of interesting plants", said ` + data.name + ` Lets try the greenhouse!"
             \n "They snuck out the window throught the  ` + currentWeather + ` and down to the greenhouse at the bottom of the garden.
             \n "What's that? whispered ` + data.teddyName + `
              \n "HELLO!" shouted` + data.name + `. A sloth stuck its head slowly out of the window. "Welcome to... the jungle... I'm Sammy... the Sloth... let me... show you... around."`



        var junglePrompt2 = `

        Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
              supposed to be asleep in their home in ` + data.country + `. 
              \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
              \n"No", ` + data.teddyName + ` groaned.
              \n"Let's have an adventure!" ` + data.name + ` cried.
              \n"No, we'll get in trouble".
              \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
              \n` + data.teddyName + `'s ears twitched. "I'm listening".
              \n"We'll find lots of `  + data.food + ` in the jungle", said ` + data.name + `. 
             \n "Where will we find a jungle," ` + data.teddyName + `asked? 
             \n "Jungles are hot and humid with lots of interesting plants", said ` + data.name + ` Lets try the greenhouse!"
             \n "They snuck out the window throught the  ` + currentWeather + ` and down to the greenhouse at the bottom of the garden.
             \n "What's that? whispered ` + data.teddyName + `
              \n "HELLO!" shouted` + data.name + `. A hummingbird stuck its head quickly out of the window. "Welcome to the jungle, I'm Harriet the Hummingbird. Let me show you around."`





        var seaPrompt1 = `

            Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
            supposed to be asleep in their home in ` + data.country + `. 
            \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
            \n"No", ` + data.teddyName + ` groaned.
            \n"Let's have an adventure!" ` + data.name + ` cried.
            \n"No, we'll get in trouble".
            \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
            \n` + data.teddyName + `'s ears twitched. "I'm listening".
            \n"We'll find lots of `  + data.food + ` at sea", said ` + data.name + `. 
           \n "How will we get to sea?" ` + data.teddyName + `asked.
           \n "Lets get very mucky and we will have to have a bath", said ` + data.name + `"
           \n "What's the weather like?"
           \n ` + currentWeather + `, said ` + data.teddyName + `
           \n "They went out into the garden and covered themselves in mud. Soon daddy exclaimed and sweeped them up into the bath.
           \n "Here we are on the high seas", said` + data.name + `. "Suddenly an octopus rose up from the depths. "Hello there, I'm Owen the Octopus and I will lead you to the treasure of ` + data.food + `."`


        var seaPrompt2 = `

            Once upon a time, ` + data.age + `-year-old ` + data.name + ` and ` + data.teddyName + ` ` + data.teddyType + ` were
            supposed to be asleep in their home in ` + data.country + `. 
            \n"Psst! Are you awake?" ` + data.name + ` asked ` + data.teddyName + `.
            \n"No", ` + data.teddyName + ` groaned.
            \n"Let's have an adventure!" ` + data.name + ` cried.
            \n"No, we'll get in trouble".
            \n"What if we go on an adventure to find ` + data.food + `? ` + data.teddyName + ` loved ` + data.food + `.
            \n` + data.teddyName + `'s ears twitched. "I'm listening".
            \n"We'll find lots of `  + data.food + ` at sea", said ` + data.name + `. 
           \n "How will we get to sea?" ` + data.teddyName + `asked.
           \n "Lets get very mucky and we will have to have a bath", said ` + data.name + `"
           \n "What's the weather like?"
           \n ` + currentWeather + `, said ` + data.teddyName + `
           \n "They went out into the garden and covered themselves in mud. Soon daddy exclaimed and sweeped them up into the bath.
           \n "Here we are on the high seas", said` + data.name + `. "Suddenly a pair of rubber ducks rose up from the bubbles. "Hello there, we're the Jill and Jane the Rubber Duckies, and we need your help to find our golden eggs."`



        const storyEnd = `"But now it is time for sleep", said Daddy, coming in to tuck in ` + data.name + ` and ` + data.teddyName + ` and to
        turn off the light. `






        const newContribution = new Contribution({
          title: sanitizeHtml(data.title),
          name: sanitizeHtml(data.name),                // sanitize user input
          age: sanitizeHtml(data.age),        // sanitize user input
          teddyName: sanitizeHtml(data.teddyName),
          teddyType: sanitizeHtml(data.teddyType),
          food: sanitizeHtml(data.food),
          country: sanitizeHtml(data.country),  // sanitize user input
          genre: sanitizeHtml(data.genre),
          likes: likes,   //added like for like button
          weather: currentWeather,
          //weather: getWeather().then(),//currentWeather,
          //weathers: weathers.then(),//getWeather().then(function(result){console.log(result); return "normalReturn";}), //weathersReturn,
          image: imageUrlReturn,       //getImage(),
          story: prompt,//await getGpt3(), 

          contributor: user._id,
        });




        //Async chain to order and handle promises from weather, image, stem, prompt, and database
        // async function produceStory() {
        const weatherAwait = await getWeather(user);
        console.log(currentWeather);
        const imageAwait = await getImage(weatherAwait);
        console.log(imageUrlReturn);
        const stemAwait = await chooseStem(imageAwait);
        console.log(prompt);
        const gpt3Await = await getGpt3(stemAwait);
        console.log(output);
        await newContribution.save(gpt3Await);
        console.log('All work done');
        return h.redirect("/report");

        // }

        // produceStory(); // does all the work



        //chooseStem();

        // console.log(chooseStem())
        //await Promise.all(newContribution.save());

        // function waitForNewContribution() {newContribution.save()};
        //getWeather();
        // .then(res => res.waitForNewContribution());
        //const result = await getWeather();
        //const newResult = await waitForNewContribution(result);
        //console.log('final result: ' + newResult);
        //.then(result => newContribution.save(result));
        // setTimeout(waitForNewContribution, 10000);
        //await newContribution.save();
        //setTimeout(newContribution.save(), 5000);

        //await getWeather();

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

  /*
 weatherContribution: {
   auth: false,
   handler: async function (request, h) {
     const contribution = await Contribution.findById(request.params._id);
 
 
    
 // Get weather from OpenWeather API
 const axios = require("axios");
 const apiKey = "286e86f2a2706bfb9f508eedc061b148";
 
 const weatherRequest = `http://api.openweathermap.org/data/2.5/weather?q=${data.country}&appid=${apiKey}`;
   const response = await axios.get(weatherRequest)
   if (response.status == 200) {
      weather = JSON.stringify(response.data.weather[0].description)
   console.log(contribution.weather)
   contribution.weather;
 
   //console.log(weather.weather[0].description)
 
 }
 
     await contribution.save();
      return {
       contribution: weather,
     };
   }
 },
 
 */

};

module.exports = Contributions;


