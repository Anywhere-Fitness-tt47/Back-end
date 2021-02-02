require("dotenv").config()
const jwt = require("jsonwebtoken")
const jwtSecret = process.env.JWT_SECRET

module.exports = {
  isValidRegister,
  isValidLogin,
  generateToken
}

function isValidRegister(user) {
  return Boolean(
    user.username 
    && user.first_name 
    && user.last_name 
    && user.email 
    && user.password 
    && user.role
  )
} 

function isValidLogin(user) {
  return Boolean(user.username && user.password)
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
