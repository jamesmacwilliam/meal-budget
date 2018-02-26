exports.seed = (knex, Promise) => {
  return knex('ingredients').del()
  .then(() => {
    return Promise.join(
      knex('ingredients').insert({
        name: 'test-ingredient'
      })
    );
  });
};
