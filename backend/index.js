const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const AuthRouter = require("./Routes/AuthRouter");
const ProfileRouter = require("./Routes/ProfileRouter");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 8080;

// Setup session and cookie parser
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use('/user', ProfileRouter); // Add Profile routes under /user endpoint

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
