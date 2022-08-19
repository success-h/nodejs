const courseData = require("../coursesData");

function lookUp(req, res, next) {
  if (!req.params.id) {
    res.send("invalid request").status(400);
  }
  const index = courseData.find((c) => c.id === parseInt(req.params.id));
  if (!index)
    return res.status(404).send(`course with ${req.params.id} not found`);
  res.locals.name = index;
  next();
}

module.exports = lookUp;
