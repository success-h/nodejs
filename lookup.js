function lookUp(data, id) {
  const index = data.find((c) => c.id === parseInt(id));
  if (!index) return res.status(404).send(`course with ${id} not found`);
  return index;
}

module.exports = lookUp;
