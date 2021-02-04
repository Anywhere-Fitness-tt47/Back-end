const router = require("express").Router()

const User_Classes = require("./model")

const { valUserId, valClassId, valUserClass } = require("../middleware")

router.get("/devtest", async (req, res, next) => {
  try {
    const data = await User_Classes.find()
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get("/user/:id", valUserId, async (req, res, next) => {
  try {
    const data = await User_Classes.findBy({ user_id: req.params.id })
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get("/class/:id", valClassId, async (req, res, next) => {
  try {
    const data = await User_Classes.findByClass(req.params.id)
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.post("/", valUserClass, async (req, res, next) => {
  try {
    let data = await User_Classes.add(req.body)
    data = data[0]
    return res.status(200).json({ message: `User ${req.body.user_id} was added to class ${req.body.class_id}`, data })  
  } catch (err) {
    next(err)
  }
})

router.delete("/", valUserClass, async (req, res, next) => {
  try {
    let data = await User_Classes.remove(req.body)
    data = data[0]
    return res.status(200).json(`User ${req.body.user_id} was removed from class ${req.body.class_id}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
