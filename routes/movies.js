const Joi = require("joi");
const express = require("express");

const lookUp = require("../lookup");

const {
  movieData: { genres, movies },
} = require("../dbData");
const router = express.Router();

router.get("/genres", (req, res) => {
  res.send(genres);
});

router.get("/movies", (req, res) => {
  res.send(movies);
});

router.get("/genres/:id", (req, res) => {
  const id = req.params.id;
  const genre = lookUp(genres, id);
  res.send(genre);
});

router.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = lookUp(movies, id);
  res.send(movie);
});

router.post("/genres", (req, res) => {
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

router.post("/movies", (req, res) => {
  const { error, value } = validateMovies(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const movie = {
    id: movies.length + 1,
    name: req.body.name,
  };

  movies.push(movie);
  res.send(movie);
});

// put input
router.put("/genres/:id", (req, res) => {
  const id = req.params.id;
  const genre = lookUp(genres, id);
  const { error, value } = validateMovies(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  genre.name = req.body.name;
  res.send(genre);
});

// put input
router.put("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = lookUp(movies, id);
  const { error, value } = validateMovies(req.body.name);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  movie.name = req.body.name;
  res.send(movie);
});

// delete course
router.delete("/genres/:id", (req, res) => {
  const id = req.params.id;
  const genre = lookUp(genres, id);
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// delete course
router.delete("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = lookUp(movies, id);
  const index = genres.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
});

// validator
const validateMovies = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate({ name: course });
};

module.exports = router;
