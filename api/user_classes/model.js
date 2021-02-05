const db = require("../../data/db-config")

module.exports = {
  find,
  findBy,
  findByClass,
  findPair,
  add,
  remove
}

function find() {
  return db("user_classes").orderBy("class_id").orderBy("user_id")
}

function findBy(filter) {
  return db("user_classes as uc").where(filter)
    .join("users as u", "uc.user_id", "u.id")
    .join("classes as c", "uc.class_id", "c.class_id")
    .select("uc.user_id", "c.class_id",
      "u.username", "u.first_name", "u.last_name", "u.email",
      "c.name", "c.type", "c.start_time", "c.date",
      "c.duration", "c.intensity_level", "c.location",
      "c.attendees", "c.max_size", "c.instructor_username"
    )
    .orderBy("c.class_id").orderBy("u.id")
}

function findByClass(id) {
  return db("user_classes as uc").where("uc.class_id", id)
    .join("users as u", "uc.user_id", "u.id")
    .join("classes as c", "uc.class_id", "c.class_id")
    .select("uc.user_id", "c.class_id",
      "u.username", "u.first_name", "u.last_name", "u.email",
      "c.name", "c.type", "c.start_time", "c.date",
      "c.duration", "c.intensity_level", "c.location",
      "c.attendees", "c.max_size", "c.instructor_username"
    )
    .orderBy("c.class_id").orderBy("u.id")
}

async function findPair(u_id, c_id) {
  return db("user_classes")
    .where("user_id", u_id).where("class_id", c_id).first()
}

async function add(body) {
  const [id] = await db("user_classes").insert(body, "uc_id")
  return findBy({ uc_id: id })
}


function remove(body) {
  const { user_id, class_id } = body
  return db("user_classes")
    .where({ user_id }).where({ class_id }).del()
}
