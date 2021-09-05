import express from "express";
import path from "path";
import fs from "fs";

const app = express();

const posts = [
  { id: "1", title: "Hello World Static Web Page", slug: "hello-world-html-page"},
  { id: "2", title: "How to Set Up Hosting With Digital Ocean", slug: "how-to-set-up-hosting-with-digitalocean"},
  { id: "3", title: "Build a Skeleton Mongo, Express, React, Node (MERN) App", slug: "create-skeleton-app" },
]

app.use("/static/js", express.static("../fe/built/static/js"));
app.use("/static", express.static("../fe/public/static"));

app.get("/api/posts", (req, res, next) => {
  res.json({
    data: posts
  })
})

app.get("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;

  const post = posts.find((post) => {
    return post.id === id;
  });

  if (!post) {
    return res.sendStatus(404);
  }

  fs.readFile(`posts/${post.slug}.md`, (err, data) => {
    res.json({
      data: {
        ...post,
        body: data.toString()
      }
    })
  })
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../fe/public/index.html"));
});

app.listen(8080, () => {});
