exports.up = function(knex) {
  return knex.schema.createTable("user_classes", tbl => {
    tbl.increments("uc_id")
    tbl.integer("user_id").notNullable().unsigned()
      .references("id").inTable("users")
      .onDelete("CASCADE")
    tbl.integer("class_id").notNullable().unsigned()
      .references("class_id").inTable("classes")
      .onDelete("CASCADE")
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_classes")
};
