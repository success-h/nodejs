const config = require("config");
const Joi = require("joi");
const morgan = require("morgan");
const express = require("express");
const helment = require("helmet");
const debug = require("debug")("app:startup");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
app.set("view engine", "pug");
app.set("views", "./views");

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("morgan enabled");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helment());
app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.POST || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
