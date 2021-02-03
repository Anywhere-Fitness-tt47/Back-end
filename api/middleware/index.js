const Users = require("../users/model")
const Classes = require("../classes/model")
const User_Classes = require("../user_classes/model")

module.exports = {
  valClassId,
  valUserId,
  valClass,
  valPair_onPost,
  valPair_onDelete
}

async function valClassId(req, res, next) {
  const { id } = req.params

  try {
    const valIdMatch = await Classes.findBy({ class_id: id })
    
    if (valIdMatch) {
      next()
    } else {
      res.status(400).json(`The class with id ${id} could not be found`)
    }
  } catch (err) {
    next(err)
  }
}

async function valUserId(req, res, next) {
  const { id } = req.params

  try {
    const valIdMatch = await Users.findBy({ id })
    
    if (valIdMatch) {
      next()
    } else {
      res.status(400).json(`The user with id ${id} could not be found`)
    }
  } catch (err) {
    next(err)
  }
}

function valClass(req, res, next) {
  const { name, type, start_time, date, duration, intensity_level, location, attendees, max_size } = req.body

  if (name && type && start_time && date 
    && duration && intensity_level && location
    && attendees && max_size) {
      next()
    } else {
      res.status(400).json(
        "Missing required name, type, start_time, date, duration, intesity_level, location, attendees and max_size"
      )
    }
}

async function valPair_onPost(req, res, next) {
  const { user_id, class_id } = req.body

  try {
    const pair = await User_Classes.findPair(user_id, class_id)
  
    if (!pair) {
      next()
    } else {
      res.status(400).json(`User ${user_id} is already in class ${class_id}`)
    }
  } catch (err) {
    next(err)
  }
}

async function valPair_onDelete(req, res, next) {
  const { user_id, class_id } = req.body

  try {
    const pair = await User_Classes.findPair(user_id, class_id)
  
    if (pair) {
      next()
    } else {
      res.status(400).json(`User ${user_id} in class ${class_id} could not be found`)
    }
  } catch (err) {
    next(err)
  }
}
