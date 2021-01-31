require("dotenv").config()
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  isValid,
  generateToken
}

function isValid(user) {
  return Boolean(user.username && user.password && user.role)
} 

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  }
  const options = {
    expiresIn: 1000 * 60 * 60
  }

  return jwt.sign(payload, jwtSecret, options)
}
