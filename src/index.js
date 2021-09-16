const express = require("express");
const cors = require("cors");
const log = require("./logger/index");
const { register }  = require("./routes/profile");
const { auth }  = require("./routes/authonticate");
const { management }  = require("./routes/management");
const config = require("../config/default");
const { connect } = require("./db/connect")

const port = config.port;
const host = config.host

const app = express();
const passport = require('passport');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    "origin": "*",
    "methods": "GET,POST,OPTIONS,PUT,DELETE,PATCH,HEAD",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(passport.initialize());
app.use(passport.session());
// Add the line below, which you're missing:
require('./configurations/passportConfig');

app.use("/api/profile/register", register)
app.use("/api/auth/login", auth)
app.use("/api/management/user", management)
app.listen(port, host, () => {
    log.info(`server listing at http://${host}:${port}`);
    connect()
    // routes(app);
})


