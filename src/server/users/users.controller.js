const expressJwt = require('express-jwt')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const userService = require('./user.service')
const path = require('path')
let User = require('./user.model')
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET

const jwtSecret = expressJwt({secret: JWT_SECRET})

// routes
router.post('/login', login)
router.post('/register', register)
router.get('/', jwtSecret, getAll)
router.get('/current', jwtSecret, getCurrent)
router.get('/:id', jwtSecret, getById)
router.put('/:id', jwtSecret, update)
router.delete('/:id', jwtSecret, _delete)

module.exports = router;

async function register(req, res, next) {
    // userService.create(req.body).then(() => res.json({})).catch(err => next(err));
    let email = req.body.email
    let password = req.body.password
    let repeatPassword = req.body.repeatPassword

    if(email.length === 0 || password.length === 0 || repeatPassword.length === 0) {
        res
        .status(400)
        .json({
            error: 'The email or password cannot be blank'
        })
        .end()
        return next()
    }

    if(password !== repeatPassword) {
        res
        .status(400)
        .json({
            error: 'Passwords do not match'
        })
        .end()
        return next()
    }

    if(await User.findOne({email: email})) {
        res
        .status(400)
        .json({
            error: 'There is already registered user with this email. Please use another one.'
        })
        .end()
        return next()
    }

    try {
        const passwordSalt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, passwordSalt);

        const user = new User({
            email: email,
            hashedPassword: hashedPassword,
            roles: ['user']
        });

        const createUser = await User.create(user)
        if (createUser) {
            const token = jwt.sign({email: email}, JWT_SECRET, { expiresIn: '2h' })
            res.status(200).json({
                email: email,
                token: token
            })
        }

    } catch(error) {
        res.status(500).json({
            error: 'Internal error, user could not be created. Try again later.'
        })
    }
}

async function login(req, res, next) {
    /* userService.login({email: req.body.email, password: req.body.password})
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err)); */
        const email = req.body.email
        const userPassword = req.body.password
        const user = await User.findOne({email: email})
        if (user) {
            const hashedPassword = user.hashedPassword
            if(bcrypt.compareSync(userPassword, hashedPassword)) {
                const token = jwt.sign({email: email}, JWT_SECRET, { expiresIn: '2h' })
                res.status(200).json({
                    email: email,
                    token: token
                })
            } else {
                res.status(400).json({
                    error: 'Wrong username or password'
                })       
            }
        } else {
            res.status(400).json({
                error: 'Wrong username or password'
            })
        }
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