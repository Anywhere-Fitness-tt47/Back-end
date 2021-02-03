const db = require("../../data/db-config")

module.exports = {
  find,
  findBy,
  findPair,
  add,
  remove
}

function find() {
  return db("user_classes")
}

function findBy(filter) {
  return db("user_classes as uc").where(filter)
    .join("users as u", "uc.user_id", "u.id")
    .join("classes as c", "uc.class_id", "c.class_id")
    .select(
      "u.username", "u.first_name", "u.last_name", "u.email",
      "c.name", "c.type", "c.start_time", "c.date",
      "c.duration", "c.intensity_level", "c.location",
      "c.attendees", "c.max_size"
    )
    .orderBy("c.class_id")
}

async function findPair(u_id, c_id) {
  return db("user_classes")
    .where("user_id", u_id).where("class_id", c_id).first()
}

function add(body) {
  return db("user_classes").insert(body)
}

function remove(body) {
  const { user_id, class_id } = body
  return db("user_classes")
    .where({ user_id }).where({ class_id }).del()
}
