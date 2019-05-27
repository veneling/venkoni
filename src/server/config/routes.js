const express = require('express')
const mainRouter = express.Router()
const usersController = require('../users/users.controller')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const path = require('path')

module.exports = (config, app) => {

  mainRouter.use('/users', usersController)

  app.all('*', function(req, res) {
    res.sendFile(path.join(config.rootPath, '/index.html'));
  })
}