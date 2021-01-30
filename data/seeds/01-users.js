exports.seed = function(knex) {
  return knex("users").truncate()
    .then(function () {
      return knex("users").insert([
        { username: "corey", password: "reyxco", role: "instructor" }, // will get id: 1
        { username: "phil", password: "hixpl", role: "client" } // will get id: 2
      ]);
    });
};
