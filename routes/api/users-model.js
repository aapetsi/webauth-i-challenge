const db = require('../../data/db-config');

module.exports = {
  find,
  findById,
  save,
  findByEmail
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where({ user_id: Number(id) })
    .first();
}

function save(user) {
  return db('users')
    .insert(user)
    .then(ids => findById(ids[0]));
}

function findByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}
