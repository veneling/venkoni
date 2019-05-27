const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const path = require('path')

router.get('/', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

router.get('/about', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

router.get('/cv', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

router.get('/projects', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

router.get('/register', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

router.get('/login', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

router.get('/cvbuilder', function(req, res) {
  res.sendFile(path.join(config.rootPath, '/index.html'));
})

module.exports = router
