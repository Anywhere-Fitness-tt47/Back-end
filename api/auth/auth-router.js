const router = require("express").Router()
const bcryptjs = require("bcryptjs")

const Users = require("../users/model")

const { isValid, generatetoken } = require("./auth-middleware")

router.post("/register", async (req, res, next) => {
  const credentials = req.body

  const valid = isValid(credentials)

  if (isValid(credentials)) {
    try {
      const { username } = credentials
      const match = await Users.findBy({ username })

      if (!match) {
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

module.exports = router
