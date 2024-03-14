/** Database setup for BizTime. */

// Database related stuff
// Import pg and extracts client

const { Client } = require("pg");

let DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///biztime_test"
    : "postgresql:///biztime";

let db = new Client({
  connectionString: DB_URI,
});

db.connect(); 

module.exports = db;
