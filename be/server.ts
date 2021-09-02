import express from "express";
import path from "path";

const app = express();

app.use("/static", express.static("../fe/built/static"));

app.get("/api/posts/:id", (req, res, next) => {
  const { id } = req.params;

  return res.json({
    data: {
      id,
      title: "Hello World",
      body: "testing 123"
    }
  })
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../fe/public/index.html"));
});

app.listen(8080, () => {});
