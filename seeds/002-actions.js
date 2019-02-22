
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {description: "Complete seeds", notes: "Set up knex seeds in project", is_complete: true},
      ]);
    });
};