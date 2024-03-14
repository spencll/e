/** User class for message.ly */

const { DB_URI } = require("../config");
const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    // hashing
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `INSERT INTO users (username,password,first_name,last_name,phone,join_at) VALUES ($1, $2,$3, $4, $5, current_timestamp) RETURNING username,first_name,last_name,phone, join_at`,
      [username, hashedPassword, first_name, last_name, phone]
    );
    return result.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    // Querying the user
    const result = await db.query(
      `SELECT password FROM users WHERE username=$1`,
      [username]
    );
    let user = result.rows[0];
    // User exists and password is correct. User.password is hashed
    return user && (await bcrypt.compare(password, user.password));
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    // Querying to update login time
    const result = await db.query(
      `UPDATE users SET last_login_at=current_timestamp WHERE username=$1 RETURNING username`,
      [username]
    );
    // No existing user
    if (!result.rows[0]) {
      throw new ExpressError(`Username of ${username} does not exist`, 404);
    }
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  // Querying to update login time

  static async all() {
    const results = await db.query(
      `SELECT username, first_name,last_name,phone,join_at, last_login_at FROM users ORDER BY username`
    );

    // Return everything
    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT username, first_name, last_name, phone,join_at,last_login_at FROM users WHERE username=$1`,
      [username]
    );
    if (!result.rows[0]) {
      throw new ExpressError(`Username of ${username} does not exist`, 404);
    }
    return result.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const result = await db.query(
      `SELECT m.id, m.to_user, m.sent_at, m.read_at,u.username, u.first_name, u.last_name,u.phone 

    FROM messages AS m 
    JOIN users AS u ON m.to_username = u.username
    WHERE from_username = $1`,
      [username]
    );

    const msgArr = result.rows;
    // Building return thing for each message
    return msgArr.map((m) => ({
      id: m.id,
      to_user: {
        username: m.to_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone,
      },
      body: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at,
    }));
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    // Opposite of MessagesFrom
    const result = await db.query(
      `SELECT m.id, m.to_user, m.sent_at, m.read_at,u.username, u.first_name, u.last_name,u.phone 

    FROM messages AS m 
    JOIN users AS u ON m.from_username = u.username
    WHERE from_username = $1`,
      [username]
    );

    const msgArr = result.rows;
    return msgArr.map(m => ({
      id: m.id,
      from_user: {
        username: m.from_username,
        first_name: m.first_name,
        last_name: m.last_name,
        phone: m.phone,
      },
      body: m.body,
      sent_at: m.sent_at,
      read_at: m.read_at
    }))
  }
}

module.exports = User;
