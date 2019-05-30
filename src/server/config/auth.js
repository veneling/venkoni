let jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

let validateToken = (req, res, next) => {
  let token = req.headers['Authorization']
  if(token) {
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