const db = require("../../data/db-config")

module.exports = {
  find,
  findBy,
  add
}

function find() {
  return db("classes")
}

function findBy(filter) {
  return db("classes").where(filter).first()
}

async function add(body) {
  const [id] = await db("classes").insert(body, "class_id")
  return db("classes").where("class_id", id).first()
}
