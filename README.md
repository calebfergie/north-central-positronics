# North Central Positronics

A game built with [Twine](https://twinery.org/).

You can play it [here](https://thesis.calebfergie.com/). If that link isn't working, try [this](https://north-central-positronics.herokuapp.com/).

Caleb Ferguson's Thesis Project

## App Setup & Dev Details
Created with node.js/express and automatically deployed to Heroku using the [node-js-getting-started](https://devcenter.heroku.com/articles/getting-started-with-nodejs) guide, [example app](https://github.com/heroku/node-js-getting-started), and [GitHub integration guide](https://devcenter.heroku.com/articles/github-integration).

I also added [nodemon](https://nodemon.io/) to develop with greater ease locally.

### Heroku Configuration

For ease of heroku configuration, I also set the `heroku.remote` key to this app, as per [these instructions](https://stackoverflow.com/questions/17497947/is-there-a-way-to-set-a-default-app-for-heroku-toolbet)

I set the app to the custom (sub)domain [thesis.calebfergie.com](thesis.calebfergie.com) by following [this guide](https://devcenter.heroku.com/articles/custom-domains). I personally manage the [calebfergie.com](https://www.calebfergie.com/) domain through DreamHost, so I followed [these instructions](https://help.dreamhost.com/hc/en-us/articles/115000760591-Setting-your-domain-to-DNS-Only-) to help complete the process.

### Collecting Responses

The goal of this prototype is to provide an online game and collect users responses to prompts in order to expand the game. Doing this with Twine required a bit of customization, detailed below:

#### Customizing Twine

_I use the [Sugarcube 2.2.1](https://www.motoslave.net/sugarcube/2/) format within Twine for all the helpful functions it provides [see Allison's guide](http://catn.decontextualize.com/twine/) for more details._

I added custom javascript to the Twine game, which can be found in the [twine-global.js](/public/js/twine-global.js) file. This file includes:
- a minified version of jQuery
- a function to add data (the passage the user was on and the content of the response) to the DOM through invisible divs with id `passagetransfer` and `responsetransfer`:

```
postrender.collect = function() {
  var fieldval = $("input").val();
  var previousPassage = State.index(State.length - 1).title;

	if(typeof fieldval !== "undefined") {
	console.log("postrender says the user answered: " + fieldval + "on page " + previousPassage);
  $("#passagetransfer").text(previousPassage);
	$("#responsetransfer").text(fieldval);
	} else {
	console.log("no data recorded")
};
};
```
The [postrender](https://twinery.org/wiki/script#prerender_and_postrender) function fires after a user navigates away from a specific passage, collecting the passage name via the [State](https://www.motoslave.net/sugarcube/2/docs/#state-api) function/API. [This link](https://twinery.org/questions/125/how-do-you-access-the-history-in-sugarcube) was useful in figuring out how to use "State"

My current workflow is to manually add the following elements to the `index.ejs` file:

```
<!-- - add to top: -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="/js/cfscript.js"></script>
<link rel="stylesheet" type="text/css" href="/stylesheets/main.css">

<!-- - add to bottom of body: -->
<div id="passagetransfer">no passage</div>
<div id="responsetransfer">no content</div>
```
These divs are made invisible with CSS. I used the code from this [fun little article](https://medium.freecodecamp.org/how-to-disappear-completely-2f23ddb14835) to do so.

The `record` function in the `[cfscripts.js](public/js/cfscripts.js)` file plucks the values out of the DOM and calls the `postToServer` function to POST it to the server.

#### Connecting to Firebase

I followed [Google's guide](https://firebase.google.com/docs/database/admin/save-data) to setup my firebase account with this nodeJS app.

When the app server ['index.js'](index.js) gets a POST, it uploads the data to Firebase. To keep my private key secure, I added [dotnev](https://www.npmjs.com/package/dotenv) to the project and store the key information in the hidden '.env' file.

It was also necessary to add `.replace(/\\n/g, '\n')` to the end of the app initialization as per [this post](https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse).

For this repository, I have included a fake `.env` file. Remember to add 'env' to your `.gitignore` file before uploading it anywhere!

#### POSTing to Firebase

The `postToServer` function in the `[cfscripts.js](public/js/cfscripts.js)` file sends a JSON file to the node server that looks like this:

```{passage: passage,
    answer: answer}
```

The Firebase database is structured like so:

```user-responses
  |
  sessionID
    |
    UUID
      |
      Passage
        |
        User response
```

1. The sessionID is generated every time the app server app server (`[index.js](index.js)`) starts up, allowing me to separate versions of the game in the DB. This ID is made with the `[express-session](https://github.com/expressjs/session)` module.
2. Whenever the game page is loaded, a unique ID (UUID) is generated with the `[uuid](https://github.com/broofa/node-uuid)` module. This allows me to track and group the responses of a user/playthrough
3. Passage and user response information is stored under that, such that if a user plays through multiple times, all of their responses are stored under one passage record.

Getting this structure to POST correctly was done with a lot of trial and error.

## Additional resources:
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Allison Parrish's Twine Introduction](http://catn.decontextualize.com/twine/)
- [Dan Shiffman's Database as Service Tutorial](https://shiffman.net/a2z/firebase/)
- [Hackernoon Node JS Firebase Setup](https://hackernoon.com/nodejs-setup-firebase-in-4-step-tutorial-example-easy-beginner-service-account-key-json-node-server-d61e803d6cc8)
