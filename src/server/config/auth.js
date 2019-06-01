let jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

let validateToken = (req, res, next) => {
  let token = req.headers['Authorization'] || req.headers['authorization']

  if(token) {
    if (token.startsWith('Bearer ')) {
      // Strip down 'Bearer ' from the string
      token = token.slice(7, token.length);
    }
    try {
      req.decodedToken = jwt.verify(token, JWT_SECRET)
      next()
    } catch(err) {
      return res.status(400).json({
        message: 'Invalid authorisation token'
      })
    }
  } else {
    return res.status(400).json({
      message: 'Missing authorisation token'
    })
  }
}

module.exports = {
  validateToken: validateToken
}