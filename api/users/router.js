const router = require("express").Router()

const Users = require("../users/model")

router.get("/", async (req, res, next) => {
  try {
    const data = await Users.find()
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
