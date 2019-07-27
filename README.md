## Cookies, Sessions, Salts and Hashing, and SQL Injection

**Usage**
- _first time_: `npm i`
- _run app_: `npm run dev`
- _run my tests_: `npm run test:dev`

## Instructions

The premise of this exercise is to build a cookie/session login mechanism all on your own! You can do this fully by yourself. I know for some people, its intimidating to follow solely the `README`. To that end, I've provided some tests. You **can** use this as your guiding star to do this, and they should provide some guidance. That being said, nothing is wrong with simply implementing the functionality without my tests.

Some important notes. The front-end **does not need to be touched.** Yes, _its ugly_. The point is to have you focus solely on the backend. If you really want to mess with the front end application, go ahead. But its worth note it does everything required to get you up and running. If you use the `network` tab in chrome, you can see the requests its firing off. Mainly:

`/api/login`: `Body { username, password }`
`/api/signup`: `Body { username, password  }`

This is purposefully vague to have you explore this topic a bit! Remember that there is a video posted in your YouTube playlist of me covering cookies/sessions if needed. The **Part 4** includes no tests at present, so wait to chat about it before continuing.

Other useful tidbits:
- `cookieParser()` creates `req.cookies` _if they exist_.
- `res.cookie(key, value)` is an `express` way to write a `cookie`.
- `res.clearCookie(key)` is an `express` way to clear a `cookie`.
- One test may seem like its passing at first, but its passing for the wrong reasons 😉
- All environmental variables are configured by placing a `.env` file in the directory of this project. This isn't magic, or something built into JS, but it is a **standard** many developers follow across many languages. It is accomplished here by `server.js` when it loads `dotenv`. As an example here is my `.env` for this very project, I recommend that you make on as well and just replace the values with what works for your system.

```dotenv
DO_SEED=false
FORCE_DB_REFRESH=false
PORT=3000
# Must create whatever DB you put here.
DB_NAME=boiler
# For most people, this should just be: localhost:5432
DB_ADDRESS=eszwajkowski@localhost:5432
BLUEBIRD_DEBUG=0
```

### Part 1: Cookies
- Write a cookie to the browser when a user logs in with a username and password combo that matches an entry in the database. Feel free to just manually seed data and not have sign up for this.

### Part 2: Sessions
- When a user first logs in, lets create a unique id. Store that id in the cookie, but also store it in a model in the database called `Session`. `Session` should have a `sessionId` that is that unique id. It should also be related to the user that just logged in.
- When a client application makes a request to you, if it has a cookie, you should check that cookies stored id from before. If that id correlates to a session in your database, figure out which user it belongs to.
- So you know that a request came from a specific user? Well, then its a great time to use middleware to attach that userId to the request object. Probably before it goes to any of your routes...

```javascript
req.auth = { userId: user.id };

next();
```

- Only allow people to go to the `/authenticated` route if the middleware verified them as having a valid logged in session.

### Part 3: Salts & Hashing
- We should never have plain text passwords in our database. A good first attempt at this, is to have a secret SALT variable in your ENV. We can add this to peoples passwords to hide them a bit, and remove it when we want to check passwords.
- This clearly wasn't enough to solve the problem, so what we need to do is hash the password before writing, and when reading. Design a simple hash that works.
- Look into something like nodes `crypto` library (a built-in), for if it has something great to do.

### Part 4: SQL Injection
- **Lecture**
- Is your app injection prone?
- How could it become so (if not)?
- Can you inject into your app?
