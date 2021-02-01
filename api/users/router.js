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

router.get("/:id", async (req, res, next) => {
  const { id } = req.params

  try {
    const data = await Users.findBy({ id })

    if (data) {
      return res.status(200).json(data)
    } else {
      res.status(400).json(`The user with id ${id} could not be found`)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
