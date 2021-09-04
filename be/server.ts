import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use("/static", express.static("../fe/built/static"));

app.get("/api/posts", (req, res, next) => {
  res.json({
    data: [
      { id: 1, title: "Build a Skeleton Mongo, Express, React, Node (MERN) App", },
      { id: 2, title: "Hello World Static Web Page", }
    ]
  })
})

app.get("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;

  if (id === "1") {
    fs.readFile("posts/create-skeleton-app.md", (err, data) => {
      res.json({
        data: {
          id,
          title: "Build a Skeleton Mongo, Express, React, Node (MERN) App",
          body: data.toString()
        }
      })
    })  
  } else if (id === "2") {
    fs.readFile("posts/hello-world-html-page.md", (err, data) => {
      res.json({
        data: {
          id,
          title: "Hello World Static Web Page",
          body: data.toString()
        }
      })
    })  
  }
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../fe/public/index.html"));
});

app.listen(8080, () => {});
