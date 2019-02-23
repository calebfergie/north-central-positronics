const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const admin = require('firebase-admin');
const PORT = process.env.PORT || 5000
require('dotenv').config()

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

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({extended: false}))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('pages/index');})
  .post('/db', (req, res) => {
    console.log("got a post request of " + req.body.answer);
    var user_data = req.body.answer;
    var data = {
      answer: user_data
    };
    ref.push(data);
    res.status(200).end();
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
