const { render } = require("ejs");
const express = require("express");
const Posts = require("../db/file");
const router = express.Router();
module.exports = router;

// page d'accueil
router.get("/", function (req, res) {
  const valeurSaisie = req.params.user;
  const posts = Posts.loadPosts();
  res.render("pages/index", { posts: posts });
});
router.get("/posts", function (req, res) {
  const valeurSaisie = req.params.user;
  const posts = Posts.loadPosts();
  res.render("pages/index", { posts: posts });
});

// page à propos
router.get("/about", function (req, res) {
  res.render("pages/about");
});

// page hello
router.get("/hello/:user", function (req, res) {
  const valeurSaisie = req.params.user;
  res.render("pages/index", { user: valeurSaisie });
});

// affiche le poste avec l'aticle x
router.get("/post", function (req, res) {
  const id = req.query.id || "";
  const add = req.query.a || "";
  console.log(id);
  let post;
  if (id) {
    post = Posts.getPost(id);
    res.render("pages/post-read", { post });
  } else if (add) {
    res.render("pages/post-upd", { post });
  } else {
    res.redirect("/pages/");
  }
});

router.post("/post", function (req, res) {
  const id = req.query.id || "";
  const type = req.query.a || "";
  if (type === "" && id) {
    const post = Posts.getPost(id);
    res.render("pages/post-upd", { post });
  }
  if (type === "save") {
    let post = Posts.editPost(id, req.body);
    res.redirect("/");
  } else if (type === "upd") {
    const post = Posts.getPost(id);
    res.render("pages/post-upd", { post });
  } else if (type === "del") {
    Posts.deletePost(id);
    res.redirect("/");
  }
});
/***************************************/
router.use((req, res) => {
  res.status(404);
  res.json({ error: "Page not found" });
});
