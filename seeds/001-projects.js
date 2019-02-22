
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: "RDBMS Sprint", description: "Show understanding", is_complete: true}
      ]);
    });
};
