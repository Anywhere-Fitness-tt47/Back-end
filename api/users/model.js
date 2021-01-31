const db = require("../../data/db-config")

module.exports = {
  find,
  findBy,
  add
}

function find() {
  return db("users")
}

function findBy(filter) {
  return db("users").where(filter).first()
}

async function add(user) {
  const [id] = await db("users").insert(user)
  return db("users").where("user_id", id).first()
}
