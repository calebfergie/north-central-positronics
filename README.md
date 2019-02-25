# North Central Positronics

A game built with [Twine](https://twinery.org/).

You can play it [here](https://thesis.calebfergie.com/). If that link isn't working, try [this](https://north-central-positronics.herokuapp.com/).

Caleb Ferguson's Thesis Project

## App Setup & Dev Details
Created with node.js/express and automatically deployed to Heroku using the [node-js-getting-started](https://devcenter.heroku.com/articles/getting-started-with-nodejs) guide, [example app](https://github.com/heroku/node-js-getting-started), and [GitHub integration guide](https://devcenter.heroku.com/articles/github-integration).

I also added [nodemon](https://nodemon.io/) to develop with greater ease locally.

#### Heroku Configuration

For ease of heroku configuration, I also set the `heroku.remote` key to this app, as per [these instructions](https://stackoverflow.com/questions/17497947/is-there-a-way-to-set-a-default-app-for-heroku-toolbet)

I set the app to the custom (sub)domain [thesis.calebfergie.com](thesis.calebfergie.com) by following [this guide](https://devcenter.heroku.com/articles/custom-domains). I personally manage the [calebfergie.com](https://www.calebfergie.com/) domain through DreamHost, so I followed [these instructions](https://help.dreamhost.com/hc/en-us/articles/115000760591-Setting-your-domain-to-DNS-Only-) to help complete the process.

#### Collecting Responses - Customizing Twine

I added custom javascript to the twine game, which can be found in the [twine-global.js](/public/js/twine-global.js) file. This file includes:
- a minified version of jQuery
- a function to add responses to the DOM through an invisible div with id `transfercell`:

```
postrender.collect = function() {
    var fieldval = $("input").val();
	if(typeof fieldval !== "undefined") {
	console.log("postrender says the user answered: " + fieldval);
	$("#transfercell").text(fieldval);
	} else {
	console.log("no data recorded")
	}
};
```

My current workflow is to manually add the following elements to the `index.ejs` file:

```
<!-- - add to top: -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="/js/cfscript.js"></script>
<link rel="stylesheet" type="text/css" href="/stylesheets/main.css">

<!-- - add to bottom of body: -->
<div id="transfercell">No data</div>
```

The `record` function in the [cfscripts.js](public/js/cfscripts) file plucks this value out of the DOM and calls the `postToServer` function to POST it to the server.

#### Collecting Responses - Firebase

I followed [Google's guide](https://firebase.google.com/docs/database/admin/save-data) to setup my firebase account with this nodeJS app.

When the app server ['index.js'](index.js) gets a POST, it uploads the data to Firebase. To keep my private key secure, I added [dotnev](https://www.npmjs.com/package/dotenv) to the project and store the key information in the hidden '.env' file.

It was also necessary to add `.replace(/\\n/g, '\n')` to the end of the app initialization as per [this post](https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse).

Next I will focus on adding more information to the `data` JSON uploaded to firebase, including more twine passage context and timestamps.

## Additional resources:
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Allison Parrish's Twine Introduction](http://catn.decontextualize.com/twine/)
- [Dan Shiffman's Database as Service Tutorial](https://shiffman.net/a2z/firebase/)
- [Hackernoon Node JS Firebase Setup](https://hackernoon.com/nodejs-setup-firebase-in-4-step-tutorial-example-easy-beginner-service-account-key-json-node-server-d61e803d6cc8)
