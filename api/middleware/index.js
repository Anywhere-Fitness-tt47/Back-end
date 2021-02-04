const Users = require("../users/model")
const Classes = require("../classes/model")

module.exports = {
  valClassId,
  valUserId,
  valClass,
  valUserClass,
  valInstructorUsername
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

async function valUserClass(req, res, next) {
  const { user_id, class_id } = req.body

  try {
    const user = await Users.findBy({ id: user_id })
    const match = await Classes.findBy({ class_id })

    if (user && match) {
      next()
    } else if (!user) {
      res.status(400).json(`The user with id ${user_id} could not be found`)
    } else {
      res.status(400).json(`The class with id ${class_id} could not be found`)
    }
  } catch (err) {
    next(err)
  }
}

async function valInstructorUsername(req, res, next) {
  const { instructor_username } = req.body

  try {
    const instructor = await Users.findBy({ username: instructor_username })

    if (instructor && instructor.role === "instructor") {
      next()
    } else if (instructor.role !== "instructor") {
      res.status(400).json("This user is not registered as an instructor")
    } else {
      res.status(400).json(`Instructor with username ${instructor_username} could not be found`)
    }
  } catch (err) {
    next(err)
  }
}
