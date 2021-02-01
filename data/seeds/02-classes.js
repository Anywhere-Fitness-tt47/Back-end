exports.seed = function(knex) {
  return knex("classes").truncate()
    .then(function () {
      return knex("classes").insert([
        { 
          name: "Push-ups", 
          type: "resistance", 
          start_time: "10:00 a.m.", 
          duration: "20 mins",
          intensity_level: "medium",
          location: "1234 park address",
          attendees: 8,
          max_size: 10
        }, // will get id: 1, can user_(id) be pulled from req?
        { 
          name: "Sprinting", 
          type: "cardio", 
          start_time: "10:30 a.m.", 
          duration: "30 mins",
          intensity_level: "high",
          location: "main street",
          attendees: 4,
          max_size: 8
        } // will get id: 2, can user_(id) be pulled from req?
      ]);
    });
};
