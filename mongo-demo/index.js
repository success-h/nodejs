const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.error("could not  connect to Mongodb..."));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPoblished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCouse() {
  const course = new Course({
    name: "Angular course",
    author: "Mosh",

    tags: ["Angular", "Frontend"],
    isPoblished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCouse();
