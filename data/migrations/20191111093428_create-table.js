exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments('user_id');
    users
      .string('username')
      .unique()
      .notNullable();
    users.string('email').unique().notNullable;
    users.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
