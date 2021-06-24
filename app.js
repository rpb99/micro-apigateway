require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const { readdirSync } = require("fs");

const constantRoutes = require("./routes/constantRoutes");
const verifyToken = require("./middlewares/verifyToken");

const app = express();

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes Logic

// Option 1

// readdirSync("./routes").map((r) => {
//   let route = r.split(".")[0];
//   const routeArr = route.split("");

//   routeArr.map((w) => {
//     if (w === w.toUpperCase()) route = route.replace(w, "-" + w.toLowerCase());
//   });

//   app.use("/" + route, require("./routes/" + r));
// });

// Option 2

constantRoutes.map((c) => {
  return app.use(c.route, require(`./routes/${c.file}`));
});

module.exports = app;
