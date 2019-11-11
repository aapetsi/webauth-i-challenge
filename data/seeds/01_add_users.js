exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { email: 'johndoe@gmail.com', username: 'johndoe', password: '123456' },
        {
          email: 'janedoe@gmail.com',
          username: 'janedoe',
          password: '12asdf56'
        },
        {
          email: 'susandoe@gmail.com',
          username: 'susandoe',
          password: '12asdfwwasdf456'
        }
      ]);
    });
};
