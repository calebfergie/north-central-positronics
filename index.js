const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const admin = require('firebase-admin');
const session = require('express-session');
const uuidV4 = require('uuid/v4');
const enforce = require('express-sslify');
const PORT = process.env.PORT || 5000

//DOTENV
require('dotenv').config();

//FIREBASE
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'ncp-db',
    clientEmail: process.env.FIREBEMAIL,
    privateKey: process.env.FIREBPK.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBURL
});

var db = admin.database();
var ref = db.ref("user-responses");
var sess_ref;
var user_id;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .use(session({ secret: 'nosecret', cookie: { maxAge: 60000 }}))
  //COMMENT THIS OUT BEFORE RUNNING LOCALLY
  // .use(enforce.HTTPS({ trustProtoHeader: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    setIDs(req);
    console.log("sessionID is: " + sess_ref + " userID is: " + user_id);
    res.render('pages/index'); //serve the game
  })
  .post('/db', (req, res) => {
    //parse post request
    var passage = req.body.passage;
    var answer = req.body.answer;
    console.log("got request to post the response " + answer + " from passage ", passage);
    //push data to database reference
    sess_ref.child(user_id).child(passage).child(answer).push("null");
    res.status(200).end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function setIDs(req) {
    var sess = req.session.id;
    //check if the app is being run locally
    var isLocal = (req.connection.localAddress === req.connection.remoteAddress);
    if (isLocal) {
      //set database info to help group and debug
      sess_ref = ref.child("debugging");
      date = new Date();
      user_id = date.getMonth()+1 + "-" + date.getDate() + "-" + date.getFullYear();
    } else {
      //set database info to unique user store
      sess_ref = ref.child(sess); //add sessionid (sever session, not user) to database and set it as global reference variable
      user_id = uuidV4();                   //create a unique id for the user session
    }
  }
