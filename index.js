const express = require("express");
const posts = require("./posts.json");
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /posts to create a new post
// GET /posts to fetch all posts
// GET /posts/:id to fetch a single post
// PUT /posts/:id to update a single post

app.get("/posts", (req, res) => {
  return res.json({ posts });
});

app.post("/posts", function (req, res) {
  posts.push(req.body.newPost);

  let jsonStringed = JSON.stringify(posts, null, 2);
  fs.writeFile("posts.json", jsonStringed, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  return res.status(200).json({ message: "Your post has been created" });
});

app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  let findPost = posts.find((post) => {
    return post.id == id;
  });

  if (findPost) {
    return res.status(200).json({ post: findPost });
  }
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  let post = posts.find((post) => {
    return post.id == id;
  });

  const { body, title } = req.body;

  console.log(post);

  if (body) {
    post.body = body;
    console.log("rewrit");
  }

  if (title) {
    post.title = title;
  }
  let jsonStringed = JSON.stringify(posts, null, 2);
  fs.writeFile("posts.json", jsonStringed, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  return res.status(200).json({ message: "post updated" });
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
