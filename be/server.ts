import express from "express";
import path from "path";
import fs from "fs";
import cheerio from "cheerio";
import axios from "axios";

const app = express();

app.use(express.urlencoded({ extended: true }));

const posts = [
  { id: "1", title: "Hello World Static Web Page", slug: "hello-world-html-page", cover: "hello-world-static-web-page.jpg"},
  { id: "2", title: "How to Set Up Hosting With Digital Ocean", slug: "how-to-set-up-hosting-with-digitalocean", cover: "how-to-set-up-hosting-with-digitalocean.jpg"},
  { id: "3", title: "How to Register a Domain Name With Namecheap", slug: "how-to-register-domain-with-namecheap", cover: "how-to-register-domain-with-namecheap.jpg"},
  { id: "4", title: "How to Configure Namecheap DNS to Point Domain to Digital Ocean Server", slug: "how-to-configure-namecheap-dns-to-point-domain-to-digitalocean-server", cover: "how-to-configure-namecheap-dns-to-point-domain-to-digitalocean-server.jpg"},
  // { id: "3", title: "Build a Skeleton Mongo, Express, React, Node (MERN) App", slug: "create-skeleton-app" },
]

app.use("/static/js", express.static("../fe/built/static/js"));
app.use("/static", express.static("../fe/public/static"));

app.get("/api/posts", (req, res, next) => {
  res.json({
    data: posts
  })
})

app.get("/api/posts/:slug", (req, res, next) => {
  const { slug } = req.params;

  const post = posts.find((post) => {
    return post.slug === slug;
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

app.post("/api/projects/:id/submit", async (req, res, next) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url as string);

    const $ = cheerio.load(response.data);
    const h1 = $('h1')

    let success = false;

    if (h1.text() === "Hello World") {
      success = true
    }

    const post = posts.find((p) => {
      return p.id === req.params.id;
    })

    res.redirect(`/posts/${post?.slug}`)
  } catch(err) {
    return next(err);
  }
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../fe/public/index.html"));
});

app.listen(8080, () => {});
