require('dotenv').config()

const express = require('express');
const app = express();

let env = process.env.NODE_ENV || 'development'
let config = require('./config/config')[env]

require('./config/database')(config)
require('./config/express')(config, app)
require('./config/routes')(config, app)

// start server
const server = app.listen(config.port, function () {
    console.log('Server listening on port ' + config.port);
});