const Joi = require("joi");
const express = require("express");

const lookUp = require("../middleware/lookup");

const {
  movieData: { genres },
} = require("../dbData");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", lookUp, (req, res) => {
  const genre = res.locals.name;
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error, value } = validateMovies(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

// put input
router.put("/:id", lookUp, (req, res) => {
  const genre = res.locals.name;

  const { error, value } = validateMovies(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  genre.name = req.body.name;
  res.send(genre);
});

// delete course

router.delete("/:id", lookUp, (req, res) => {
  const genre = res.locals.name;
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const validateMovies = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ name: course });
};

module.exports = router;
