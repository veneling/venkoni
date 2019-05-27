﻿const expressJwt = require('express-jwt');
const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const userService = require('./user.service');
const path = require('path');

const jwtSecret = expressJwt({secret: process.env.JWT_SECRET})

// routes
router.post('/login', login)
router.post('/register', register)
router.get('/', jwtSecret, getAll)
router.get('/current', jwtSecret, getCurrent)
router.get('/:id', jwtSecret, getById)
router.put('/:id', jwtSecret, update)
router.delete('/:id', jwtSecret, _delete)

module.exports = router;

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function login(req, res, next) {
    userService.login({email: req.body.email, password: req.body.password})
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}