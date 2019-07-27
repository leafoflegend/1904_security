const chalk = require('chalk');
const app = require('./server');
const { db } = require('./database/index');
const startup = require('./startup');

startup(app, db)
  .then(() => {
    console.log(chalk.green('Application successfully started.'));
  })
  .catch(e => {
    console.log(chalk.yellow('Application failed to start.'));
    console.error(e);
    throw e;
  });
