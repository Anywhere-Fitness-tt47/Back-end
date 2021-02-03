const router = require("express").Router()

const User_Classes = require("./model")

const { valUserId, valClassId, valPair_onPost, valPair_onDelete } = require("../middleware")

router.get("/devtest", async (req, res, next) => {
  try {
    const data = await User_Classes.find()
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.get("/:id", valUserId, async (req, res, next) => {
  try {
    const data = await User_Classes.findBy({ user_id: req.params.id })
    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
})

router.post("/", valPair_onPost, async (req, res, next) => {
  try {
    const data = await User_Classes.add(req.body)
    return res.status(200).json(`User ${req.body.user_id} was added to class ${req.body.class_id}`)  
  } catch (err) {
    next(err)
  }
})

router.delete("/", valPair_onDelete, async (req, res, next) => {
  try {
    const data = await User_Classes.remove(req.body)
    return res.status(200).json(`The user ${req.body.user_id} was removed from class ${req.body.class_id}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router
