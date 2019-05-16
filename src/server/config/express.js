let express = require('express')
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('express-session')
// let passport = require('passport')
let cors = require('cors')

module.exports = (config, app) => {

  app.use(cors())
  app.use(cookieParser())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: 'verysecret',
    resave: false,
    saveUninitialized: false,
    httpOnly: true
  }))
  app.use(express.static(config.rootPath + 'dist/venkoni'))
  // app.use(passport.initialize())
  // app.use(passport.session())
  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }

    next()
  })

  // app.use(express.static(config.rootPath + 'public'))
  // app.use(express.static(config.rootPath + 'client/src'))
}