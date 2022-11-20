const knex = require("../db/knex");

const TABLE_NAME = "users";

async function findById(userId) {
  const user = await where({id: userId});
  if (user === null) {
    throw new Error("User not found")
  }
  return {...user};
}

async function where(condition) {
  return await knex(TABLE_NAME)
    .where(condition)
    .then((results) => {
      if (results.length === 0) {
        return null;
      }
      return results[0];
    });
}

module.exports = {
  findById,
};