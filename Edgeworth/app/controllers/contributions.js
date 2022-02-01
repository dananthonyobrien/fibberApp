"use strict";
const Contribution = require("../models/contribution");
const User = require("../models/user");
const Candidate = require("../models/candidate");
var sanitizeHtml = require('sanitize-html'); //Added sanitizeHtml to sanitize user input
const { logger } = require("handlebars");
const Joi = require("@hapi/joi");
const Boom = require("@hapi/boom");
var likes = 0;
var imageUrl = "No image"
var image = "https://images.unsplash.com/photo-1586410074293-91d01ca0db5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQxMjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMzOTAxODc&ixlib=rb-1.2.1&q=80&w=400";
var weathers = "Not working";
const jsdom = require('jsdom');
const dom = new jsdom.JSDOM("");
const jquery = require('jquery')(dom.window);
var axios = require('axios');



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
        //var weathers = "Not working";
        var request = require('request');




const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

try{
const response = await openai.createCompletion("text-davinci-001", {
  prompt: "Type: Space adventure\nChildren's bedtime story:  Jimmy and his teddy bear Fluffy flew out the window on a spaceship they built from an old clock and a skateboard. They landed on the moon with a thud. I thought it would taste like cheese said Fluffy in a huff, as they stared down on the glimmering world below them.\n    \nType: Jungle adventure\nChildren's bedtime story:\n\n\n",
  temperature: 0.8,
  max_tokens: 60,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
});
//var output = (response).json();
var output = response;
console.log(output);


//console.log(output.data.choice[0]);
} catch (err) {
  console.log(err);
}








/* function getImage () {
  //var imageUrl = "https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyOTQxMjB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDMzOTEzOTk&ixlib=rb-1.2.1&q=80&w=400";
  var config = {
    method: 'get',
    url: 'https://api.unsplash.com/photos/random?client_id=viDjCrfXcegOSN_Jqlt1PaZZDBV6pvw3xPbWyoTTmPY&query=cat',
    headers: { 
    }
  };
  
 axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
   // console.log("response.urls.regular:" + JSON.stringify(response.urls.regular));
    console.log("")

    imageUrl = String(JSON.stringify(response));
   // var imageUrlReg = String(imageUrl.urls.regular);

  })
  .catch(function (error) {
    console.log(error);
  });
  
  return imageUrl; 


  
} */
  

 /* var settingsUnsplash = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.unsplash.com/photos/random?client_id=viDjCrfXcegOSN_Jqlt1PaZZDBV6pvw3xPbWyoTTmPY&query=cat",
    "method": "GET"
  }

  $.ajax(settingsUnsplash).done(function (response) {
    console.log(response);

    var contentImage = response.urls.raw;
    var contentImageURL = response.urls.regular;

    var contentImageCredit = response.user.name;
    var contentImageDescription = response.description;
    var contentImageAltDescription = response.alt_description;


    const storyImageURL = document.getElementsByClassName('story-image-url')[0];
    //$("#storyImageURL").append(contentImageURL);
    storyImageURL.setAttribute('src', contentImageURL)



    //$("#storyImage").append(contentImage);
    //$("#storyImageCredit").append(contentImageCredit);
    //$("#storyImageDescription").append(contentImageDescription);
    //$("#storyImageAltDescription").append(contentImageAltDescription);
    
    return contentImage;
  }); */




       // var weatherSettings = {
       //   "url": "https://api.openweathermap.org/data/2.5/weather?q=cork&appid=286e86f2a2706bfb9f508eedc061b148&units=metric",
        //  "method": "GET",
       //   "timeout": 0,
       // };

        // $(document).ready(function () {


        /*   $.ajax(weatherSettings).done(function (response) {
             console.log(response);
 
             var weathers = response.weather.main;
             console.log(content);
             $("#weather").append(weathers);
           }); */


        // });

        /*var weatherSettings = {
          "async": false,
          "crossDomain": true,
          "url": "https://api.openweathermap.org/data/2.5/weather?q=cork&appid=286e86f2a2706bfb9f508eedc061b148&units=metric",
          "method": "GET"
        }
        $.ajax(weatherSettings).done(function (response) {
          console.log(response);
          var weathers = response.weather[0].main; */





        function getWeather(){
        
        var request = require('request');
         var options = {
           'method': 'GET',
           'url': 'https://api.openweathermap.org/data/2.5/weather?q=cork&appid=286e86f2a2706bfb9f508eedc061b148&units=metric',
           'headers': {
           }
           
         };
         request(options, function (error, response) {
           if (error) throw new Error(error);
          
         console.log("Response.body:" + response.body); 
        //var weatherText = JSON.parse(response.body);  


         return response.body;
  
         });
        }
        
        //var jsonObject = JSON.parse(response.responseJSON);     //     var jsonObject = JSON.parse(response.body);

        //weathers = (jsonObject.weather[0].main).text;//document.getElementById("weathers").innerHTML = jsonObject.weather;
          //console.log(weathers);
         //console.log("response.body.weather.main: " + response.body.weather.main);
         //console.log("response.weather.main: " + response.weather.main);
         //console.log("response.weather[0].main: " + response.weather[0].main);


         //var weathers = response.body.weather.main;
         //console.log("Weather: " + weathers);
          
         //console.log("Response:" + JSON.stringify(response));
        // var readableResponse = JSON.stringify(response);
        // if (readableResponse.hasOwnProperty("weather")){
        //   console.log(readableResponse.weather.main);             //007
       //}
 
         //console.log("Response.body.weather " + response.body.weather);
         //console.log("Response[1][1]:" + response[1][1]);
         //console.log("Response.body['weather]" + response.body["weather"]);
         //console.log("Response['weather][0]" + response["weather"][0]);
         //console.log("Response['weather][0]" + response[0][0]);
 
 
 
         //console.log(response.body[1]);
         //weathers=(response).te
        //console.log(response[1][1]);
          // console.log(response.body[1]);
          // weathers=(response.body[1]).text;
          // console.log(response.body.weather);
          // weathers=response.body.weather;
           //var weathers = response.weather[0].main;
           //var weathers = response[1][1];
           //weathers = response.body;

        

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
          weathers: getWeather(),
          image: image,       //getImage(),
          
          /*getWeather() {
            var options = {
              'method': 'GET',
              'url': 'https://api.openweathermap.org/data/2.5/weather?q=cork&appid=286e86f2a2706bfb9f508eedc061b148&units=metric',
              'headers': {
              }
              
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);

          },   */   //weathers: weathers,

          contributor: user._id,
        });

      

        await newContribution.save();
        await getWeather();
        return h.redirect("/report");
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






};

module.exports = Contributions;


