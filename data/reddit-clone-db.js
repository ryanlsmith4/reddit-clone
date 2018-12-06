/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

const url = "mongodb://localhost/reddit-db";

mongoose.Promise = global.Promise;
mongoose.connect(
    url,
    { useNewUrlParser: true },
    (err, db) => {
        assert.equal(null, err);
        console.log("connected successfully to database");
        // db.close(); turn on for testing
    }
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error"));
mongoose.set("debug", true);

module.exports = mongoose.connection;
