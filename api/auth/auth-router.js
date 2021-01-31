const router = require("express").Router()
const bcryptjs = require("bcryptjs")

const Users = require("../users/model")

const { isValid, generateToken } = require("./auth-middleware")

router.post("/register", async (req, res, next) => {
  const credentials = req.body

  if (isValid(credentials)) {
    const rounds = 10
    credentials.password = bcryptjs.hashSync(credentials.password, rounds)

    try {
      const { username } = credentials
      const user = await Users.findBy({ username })

      if (!user) {
        try {
          const data = await Users.add(credentials)
          return res.status(200).json(data)
        } catch (err) {
          next(err)
        }
      } else {
        res.status(400).json("Username taken")
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.status(400).json("Username, password and role required")
  }
})

router.post("/login", async (req, res, next) => {
  const credentials = req.body

  if (isValid(credentials)) {
    try {
      const { username, password } = credentials
      const user = await Users.findBy({ username })
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user)
        return res.status(200).json({ message: `Welcome, ${username}`, token })
      } else {
        res.status(400).json("Invalid username or password")
      }
    } catch (err) {
      next(err)
    }
  } else {
    res.status(400).json("Username, password and role required")
  }
})

module.exports = router
