const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
    await client.connect();
    db = client.db("employeeDirectory");
    console.log("✅ Connected to MongoDB");
}

function getDB() {
    if (!db) throw new Error("❌ DB not initialized");
    return db;
}

module.exports = { connectDB, getDB };
