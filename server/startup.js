const seed = require('./database/utils/seed');

const DO_SEED = process.env.DO_SEED === 'true';
const FORCE_DB_REFRESH = process.env.FORCE_DB_REFRESH === 'true' || false;
const PORT = parseInt(process.env.PORT) || 3000;

const startup = (app, db) => {
  return db
    .sync({ force: FORCE_DB_REFRESH })
    .then(() => {
      console.log('DB is connected.');
      return DO_SEED ? seed() : Promise.resolve(true);
    })
    .then(() => {
      if (DO_SEED) console.log('DB is seeded.');
      return new Promise(res => {
        app.listen(PORT, () => {
          console.log('App is now listening on PORT', PORT);
          res();
        });
      });
    })
    .catch(e => {
      console.error('Error connecting to DB.', e);
    });
};

module.exports = startup;
