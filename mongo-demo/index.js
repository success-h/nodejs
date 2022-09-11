const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.error("could not  connect to Mongodb...", { err }));

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
    name: "Node course",
    author: "Mosh",
    tags: ["node", "Backend"],
    isPoblished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ author: "Mosh", isPoblished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log("course:", courses);
}

getCourses();
