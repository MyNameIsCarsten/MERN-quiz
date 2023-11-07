const { MongoClient } = require("mongodb");
require("../loadEnvironment.js");

const connectionString = process.env.ATLAS_URI || "";

async function connectToDatabase() {
  const client = new MongoClient(connectionString);

  let conn;

  try {
    conn = await client.connect();
  } catch (e) {
    console.error(e);
  }

  let db = conn.db("myFirstDatabase");

  return db;
}

module.exports = connectToDatabase;