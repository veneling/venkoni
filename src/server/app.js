require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const path = require('path')

const clientPath = path.normalize(path.join(__dirname, '/../../'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.get('/', function(req, res) {
  console.log(clientPath)
  res.sendFile(clientPath + '/dist/venkoni/index.html')
});

// api routes
app.use('/users', require('./users/users.controller'));
app.use(express.static(clientPath + '/dist/venkoni'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});