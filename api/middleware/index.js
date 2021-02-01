const Classes = require("../classes/model")

module.exports = {
  valId,
  valClass
}

async function valId(req, res, next) {
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

function valClass(req, res, next) {
  const { name, type, start_time, duration, intensity_level, location, attendees, max_size } = req.body

  if (name && type && start_time
    && duration && intensity_level && location
    && attendees && max_size) {
      next()
    } else {
      res.status(400).json(
        "Missing required name, type, start_time, duration, intesity_level, location, attendees and max_size"
      )
    }
}
