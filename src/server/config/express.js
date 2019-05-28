let express = require('express')
let bodyParser = require('body-parser')
// let cors = require('cors')

module.exports = (config, app) => {

  // app.use(cors())
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "Content-Type,X-CSRF-Token, Set-Cookie, Cookie, Authorization, *");
    next();
  });
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(config.rootPath))

}