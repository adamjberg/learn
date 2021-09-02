import express from "express";
import path from "path";
import fs from "fs";

const app = express();

app.use("/static", express.static("../fe/built/static"));

app.get("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;

  fs.readFile("posts/create-skeleton-app.md", (err, data) => {

    

    res.json({
      data: {
        id,
        title: "Hello World",
        body: data.toString()
      }
    })
  })  
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../fe/public/index.html"));
});

app.listen(8080, () => {});
