const router = require("express").Router()

const Classes = require("./model")

const { valId, valClass } = require("../middleware")

router.get("/", async (req, res, next) => {
  try {
    const data = await Classes.find()
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", valId, async (req, res, next) => {
  try {
    const data = await Classes.findBy({ class_id: req.params.id })
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.post("/", valClass, async (req, res, next) => {
  try {
    const data = await Classes.add(req.body)
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  const { id } = req.params
  const changes = req.body

  try {
    const match = Classes.findBy({ class_id: id })

    if (match) {
      Classes.update(changes, id)
      const data = await Classes.findBy({ class_id: id })
      return res.status(200).json(data)
    } else {
      res.status(400).json(`The class with id ${id} could not be found`)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
