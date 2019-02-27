const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const admin = require('firebase-admin');
const session = require('express-session');
const uuidV4 = require('uuid/v4');
const PORT = process.env.PORT || 5000
require('dotenv').config()


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
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    sess_ref = ref.child(req.session.id); //add sessionid (sever session, not user) to database and set it as global reference variable
    user_id = uuidV4();                   //create a unique id for the user session
    console.log("sessionID is: " + req.session.id + " userID is: " + user_id);
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
