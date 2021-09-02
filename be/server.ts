import express from "express";
import path from "path";

const app = express();

app.use("/static", express.static("../fe/built/static"));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../fe/public/index.html"));
});

app.listen(8080, () => {});
