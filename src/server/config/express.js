let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

module.exports = (config, app) => {

  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(config.rootPath))

}