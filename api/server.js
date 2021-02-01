const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/router")

const restricted = require("./auth/auth-restricted")

server.use("/api/auth", authRouter)
server.use("/api/users", restricted, usersRouter)

server.use((err, req, res, next) => {
  return res.status(500).json({ 
    error: "There was a problem communicating with the server",
    message: err.message,
    stack: err.stack
   })
})

module.exports = server
