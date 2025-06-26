// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://cloco3931:clocoDev@cluster0.n3yapat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});
const Blog = mongoose.model("Blog", BlogSchema);

// POST /blogs to save article
app.post("/blogs", async (req, res) => {
  console.log(req.body);
  const blog = new Blog({ title: req.body.title, content: req.body.content });
  await blog.save();
  res.status(201).json(blog);
});

// GET /blogs to list articles
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

app.listen(8000, () => console.log("Server listening on port 8000"));
