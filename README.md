# North Central Positronics

A game built with [Twine](https://twinery.org/).

You can play it [here](https://thesis.calebfergie.com/). If that link isn't working, try [this](https://north-central-positronics.herokuapp.com/).

Caleb Ferguson's Thesis Project

## App Setup & Dev Details
Created with node.js/express and automatically deployed to Heroku using the [node-js-getting-started](https://devcenter.heroku.com/articles/getting-started-with-nodejs) guide, [example app](https://github.com/heroku/node-js-getting-started), and [GitHub integration guide](https://devcenter.heroku.com/articles/github-integration).

I also added [nodemon](https://nodemon.io/) to develop with greater ease locally.

#### Heroku Configuration

For ease of heroku configuration, I also set the 'heroku.remote' key to this app, as per [these instructions](https://stackoverflow.com/questions/17497947/is-there-a-way-to-set-a-default-app-for-heroku-toolbet)

I set the app to the custom (sub)domain [thesis.calebfergie.com](thesis.calebfergie.com) by following [this guide](https://devcenter.heroku.com/articles/custom-domains). I personally manage the 'calebfergie.com' domain through DreamHost, so I followed [these instructions](https://help.dreamhost.com/hc/en-us/articles/115000760591-Setting-your-domain-to-DNS-Only-) to help complete the process.

#### Collecting Responses - Customizing Twine

I added custom javascript to the twine game, which can be found in the [twine-global.js](/public/js/twine-global.js) file. This file is almost all a  minified version of jQuery, along with the following function to add responses to the DOM so the app can pick them up:

`postrender.collect = function() {
    var fieldval = $("input").val();
	if(typeof fieldval !== "undefined") {
	console.log("postrender says the user answered: " + fieldval);
	$("#transfercell").text(fieldval);
	} else {
	console.log("no data recorded")
	}
};`

My current workflow is to manually add the following elements to the `index.ejs` file:

`<!-- - add to top: -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="/js/cfscript.js"></script>

<!-- - add to bottom of body: -->
	<div id="transfercell">No data</div>`

#### Collecting Responses - Firebase

Currently working on this.

## Additional resources:
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Allison Parrish's Twine Introduction](http://catn.decontextualize.com/twine/)
- [Dan Shiffman's Database as Service Tutorial](https://shiffman.net/a2z/firebase/)
