const router = require("express").Router()

const Classes = require("./model")

const { valClassId, valClass } = require("../middleware")

router.get("/", async (req, res, next) => {
  try {
    const data = await Classes.find()
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", valClassId, async (req, res, next) => {
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

router.put("/:id", valClassId, valClass, async (req, res, next) => {
  try {
    Classes.update(req.body, req.params.id)
    const data = await Classes.findBy({ class_id: req.params.id })
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', valClassId, async (req, res) => {
  Classes.remove(req.params.id)
  return res.status(200).json(`The class with id ${req.params.id} was removed`)  
});

module.exports = router
