module.exports = {
  isValid,
  generateToken
}

function isValid(user) {
  return Boolean(user.username && user.password && user.role)
} 

function generateToken(user) {
  return console.log("[generateToken] wired")
}
