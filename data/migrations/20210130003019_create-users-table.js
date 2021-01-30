exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments("user_id")
    tbl.string("username").notNullable().unique()
    tbl.string("password").notNullable().unique()
    tbl.string("role", 10).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users")
};
