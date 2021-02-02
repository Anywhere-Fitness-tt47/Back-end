exports.seed = function(knex) {
  return knex("classes").truncate()
    .then(function () {
      return knex("classes").insert([
        { 
          name: "Push-ups", 
          type: "resistance", 
          start_time: "10:00 a.m.", 
          date: "1/1/11",
          duration: 20,
          intensity_level: "medium",
          location: "1234 park address",
          attendees: 8,
          max_size: 10
        }, // will get id: 1, can user_(id) be pulled from req?
        { 
          name: "Sprinting", 
          type: "cardio", 
          start_time: "10:30 a.m.", 
          date: "2/2/22",
          duration: 30,
          intensity_level: "high",
          location: "main street",
          attendees: 4,
          max_size: 8
        } // will get id: 2, can user_(id) be pulled from req?
      ]);
    });
};
