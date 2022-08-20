const Joi = require("joi");
const express = require("express");
const { courseData } = require("../dbData");
const router = express.Router();
const lookUp = require("../lookup");

router.get("/", (req, res) => {
  res.send(courseData);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const course = lookUp(courseData, id);
  res.send(course);
});

router.post("/", (req, res) => {
  const { error, value } = validateCourse(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    id: courseData.length + 1,
    name: req.body.name,
  };

  courseData.push(course);
  res.send(course);
});

// put input
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const course = lookUp(courseData, id);

  const { error, value } = validateCourse(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

// delete course

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const course = lookUp(courseData, id);
  const index = courseData.indexOf(course);
  courseData.splice(index, 1);
  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ name: course });
};

module.exports = router;
