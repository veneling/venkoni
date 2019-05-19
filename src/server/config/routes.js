const express = require('express')
const mainRouter = express.Router()
const homeController = require('../home/home.controller')
const usersController = require('../users/users.controller')

module.exports = (config, app) => {

  mainRouter.use('/', homeController)
  mainRouter.use('/users', usersController)

  app.use('/', mainRouter)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}