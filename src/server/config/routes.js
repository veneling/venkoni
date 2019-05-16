var createError = require('http-errors');
let controllers = require('../controllers/_index')
let auth = require('../config/auth')

module.exports = (app) => {
  app.get('/', auth.protectedRoute(), controllers.home.index)
  // app.get('/users/register', controllers.users.register)
  app.post('/users/register', controllers.users.createUser)
  app.get('/users/logout', controllers.users.logout)
  app.get('/users/login', controllers.users.login)
  app.post('/users/login', controllers.users.authenticate)
  app.get('/users/isLogged', controllers.users.isLogged)

  // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}