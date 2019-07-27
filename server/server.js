const chalk = require('chalk');
const express = require('express');
const path = require('path');
const { UniqueConstraintError } = require('sequelize');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const { models } = require('./database/index');

const { User, Session } = models;

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const app = express();

const publicPath = path.join(__dirname, './public');

const hash = () =>
  new Promise((res, rej) => {
    crypto.randomBytes(256, (err, buf) => {
      if (err) rej(err);
      res(buf.toString());
    });
  });

const cookieId = 'SID';

app.use(express.json());
app.use(cookieParser());

app.use(async (req, res, next) => {
  if (req.cookies.SID) {
    const user = await User.findOne({
      includes: [
        {
          model: Session,
          where: {
            sessionId: req.cookies.SID,
          },
        },
      ],
    });

    const session = await Session.findOne({
      where: {
        sessionId: req.cookies.SID,
      },
    });

    if (!session) {
      res.clearCookie('SID');
      res.redirect('/');
      return;
    }

    const updatedSession = await session.update({
      count: session.count + 1,
    });

    console.log('Session: ', updatedSession.count);

    req.auth = { userId: user.id };
    next();
  } else {
    next();
  }
});

app.use((req, res, next) => {
  console.log(
    chalk.yellow(req.method),
    'Request to',
    chalk.blue(req.path),
    typeof req.auth === 'object' && req.auth.userId
      ? chalk.cyan(`from user ${req.auth.userId}`)
      : '',
  );
  next();
});

app.use(express.static(publicPath));

app.post('/api/login', async (req, res) => {
  if (req.auth && req.auth.userId) {
    res.sendStatus(200);
    return;
  }

  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(401);
    return;
  }

  try {
    const user = await User.login(username, password);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    const [session, wasCreated] = await Session.findOrCreate({
      where: { userId: user.id },
      defaults: {
        sessionId: await hash(),
      },
    });

    if (!wasCreated) {
      await session.update({
        count: 0,
      });
    }

    res.cookie(cookieId, session.sessionId);
    res.send({
      name: user.username,
    });
  } catch (e) {
    console.error('Error during login.', e);
    res.sendStatus(500);
  }
});

app.post('/api/logout', (req, res) => {
  if (!req.auth) {
    res.sendStatus(400);
    return;
  }

  res.clearCookie(cookieId);
  res.sendStatus(200);
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.sendStatus(400);
    return;
  }

  try {
    const user = await User.create({
      username,
      password,
    });

    res.send({
      name: user.username,
    });
  } catch (e) {
    if (e instanceof UniqueConstraintError) {
      res.status(400).send('Username already taken.');
    } else {
      res.sendStatus(500);
    }
  }
});

app.get('/api/whoami', (req, res) => {
  res.sendStatus(200);
});

app.get('/authenticated', (req, res, next) => {
  if (!req.auth) {
    res.status(401).send('You shall not pass.');
    return;
  }

  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, './index.html'));
});

app.use((err, req, res, next) => {
  res.status(500);
  console.error(err);
  res.send({ error: err });
});

module.exports = app;
