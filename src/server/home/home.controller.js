const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const path = require('path')

router.get('/', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

module.exports = router
