const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async (req, res, next) => {
  try {
    // Extract from body
    const { username, password } = req.body;

    // If something's missing
    if (!username || !password) {
      throw new ExpressError("Username and password required", 400);
    }

    // uses our class methods on the request info
    if (await User.authenticate(username, password)) {
      const token = jwt.sign({ username }, SECRET_KEY);
      User.updateLoginTimestamp(username);
      return res.json({ token });
    }

    throw new ExpressError("Invalid username/password", 400);
  } catch (e) {
    return next(e);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

module.exports = router;
