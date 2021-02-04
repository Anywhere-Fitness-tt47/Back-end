exports.up = function(knex) {
  return knex.schema.createTable("classes", tbl => {
    tbl.increments("class_id")
    tbl.string("name").notNullable().unique() // must be unique
    tbl.string("type").notNullable()
    tbl.string("start_time").notNullable()
    tbl.string("date").notNullable()
    tbl.integer("duration").notNullable()
    tbl.string("intensity_level").notNullable()
    tbl.string("location").notNullable()
    tbl.integer("attendees").notNullable()
    tbl.integer("max_size").notNullable()
    tbl.string("instructor_username").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("classes")
};
