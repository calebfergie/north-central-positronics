const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000
require('dotenv').config()



express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {res.render('pages/index');console.log(process.env.FAKESECRET);})
  .post('/db', (req, res) => {console.log("got a post request of " + req.body.answer),res.status(200).end();})
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
