require('dotenv').config();
const mongoose = require('mongoose');
const config = require("../../config/default");
const log = require("../logger");

function connect() {
    const dbUri = config.dbUri;
    return mongoose
        .connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(()=>{
            log.info("database connected")
        })
        .catch((error)=>{
            log.error("db error", error)
            process.exit(1);
        });
}

module.exports = {
    connect: connect
}