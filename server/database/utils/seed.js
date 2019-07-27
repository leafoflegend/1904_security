const {
  models: { User },
} = require('../index');

module.exports = () =>
  User.create({ username: 'Edward Elric', password: 'philosophers_stone' })
    .then(ed => {
      return ed;
    })
    .catch(e => {
      console.error('Error seeding Database.', e);
      throw new Error(e);
    });
